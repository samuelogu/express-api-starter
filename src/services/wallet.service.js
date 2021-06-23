const crypto = require('crypto');
const createError = require('http-errors')
const axios = require('axios');
const db = require('../connectors/knex')
const { chargeConfig, refundConfig, getBanks, resolveAccount, transferRecipient, withdraw } = require("./paystack.service")
const moment = require('moment')

class walletService {

    static async addCard(cardDetails) {

        cardDetails.expiry_month = moment(cardDetails.expiry_date).format('MM')
        cardDetails.expiry_year = moment(cardDetails.expiry_date).format('YYYY')
        console.log(cardDetails);
        return

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
        const chargeResponse = await axios(chargeConfig(cardPayload));
        //if charge was successful, refund users money sharp o
        if (chargeResponse.data.message === 'Charge attempted') {
            let refundPayload = JSON.stringify({
                amount: 50 * 100,
                transaction: reference,
            });
            const refundResponse = await axios(refundConfig(refundPayload));
            //after refunding, get the auth details from paystack and store in the database
            const { authorization_code, card_type, last4, exp_month, exp_year, bin, bank, signature } = chargeResponse.data.data.authorization;
            //check if user has already added this card to the database
            const cardExists = await this. findSignature(signature)

            if (cardExists) throw createError.Conflict("Card Details already Exist")


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

        throw createError.BadRequest("Unable to add card at the moment")

    }

    static async addCardToDb(data) {
        return db.table('farms').insert(data)
    }

    static async findSignature(signature) {
        return db.table('cards').where('signature', signature)
    }

    static async chargeSavedCard (details) {

        const { amount, userId, email, authorization_code } = details

    const reference = crypto.randomBytes(5).toString('hex');

    const data = JSON.stringify({
        email,
        amount: amount * 100,
        reference,
        authorization_code
    })

    const chargeResponse = await axios(chargeConfig(data))

    if (!chargeResponse.data.status) throw createError.BadRequest()

        return await this.newTransaction({
            userId, authorization_code, reference, description: 'Fund wallet'
        })

    }

    async newTransaction(data) {

    }

}

module.exports = walletService;
