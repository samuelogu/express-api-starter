const crypto = require('crypto');
const createError = require('http-errors')
const axios = require('axios');
const db = require('../connectors/knex')
const paystack = require("./paystack.service")
const moment = require('moment')

class walletService {

    static async addCard(cardDetails) {
        cardDetails.expiry_month = moment(cardDetails.expiry_date).format('MM')
        cardDetails.expiry_year = moment(cardDetails.expiry_date).format('YY')

        const { email, cvv, number, expiry_month, expiry_year, pin, userId } = cardDetails

        const reference = crypto.randomBytes(5).toString('hex');
        //charge the user 50 naira to validate the card;
        let cardPayload = {
            email,
            amount: 50 * 100, // charge the user 50 box
            reference,
            card: {
                cvv, number, expiry_month, expiry_year,
            },
            pin
        }
        const chargeResponse = await paystack.charge(cardPayload);
        //if charge was successful, refund users money sharp o
        if (!chargeResponse.data.status)  throw createError.BadRequest("Unable to add card at the moment")

            let refundPayload = JSON.stringify({
                amount: 50 * 100,
                transaction: reference,
            });

            await paystack.refund(refundPayload)

            //after refunding, get the auth details from paystack and store in the database
            let { authorization_code, card_type, last4, exp_month, exp_year, bin, bank, signature } = chargeResponse.data.data.authorization;
            //check if user has already added this card to the database
            const cardExists = await this.findSignature(signature)

            if (cardExists.length) throw createError.Conflict("Card Details already Exist")

            exp_year = expiry_year

            const cardAuthDetails = {
                userId,
                authorization_code,
                bin,
                last4,
                exp_month,
                exp_year,
                card_type,
                signature,
                bank
            }

            return await this.addCardToDb(cardAuthDetails);

    }

    static async addCardToDb(data) {
        return db.table('cards').insert(data)
    }

    static async findSignature(signature) {
        return db.table('cards').where('signature', signature)
    }

    static async getTransactions(userId) {
        return db.table('transactions').where('userId', userId)
    }

    static async getBalance(userId) {
        const user = await db.table('users').where('id', userId)
        return user[0].wallet
    }

    static async updateBalance(userId, amount) {
        const oldBalance = await this.getBalance(userId)
        const wallet = oldBalance + amount
        await db.table('users').where('id', userId).update({ wallet })
    }

    static async addTransaction(data) {
        console.log(data);
        await db.table('transactions').insert(data)
    }

    static async chargeSavedCard (details) {

        const { amount, userId, email, authorization_code } = details

        const data = {
            email,
            amount: amount * 100,
            authorization_code
        }

        const response = await paystack.chargeAuthorization(data)
        if (!response.data.status) throw createError.BadRequest("Unable to charge card at the moment")
        const { reference } = response.data.data
        await this.updateBalance(userId, amount)
        await this.addTransaction({
            amount, userId, authorization_code, reference, description: 'Fund wallet', type: 1
        })
        return response.data.data

    }

}

module.exports = walletService;
