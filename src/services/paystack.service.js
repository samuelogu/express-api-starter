const paystack_secrete = process.env.PAYSTACK_SECRETE_KEY
const axios = require('axios');
const url = 'https://api.paystack.co'
const config = {
    headers: { Authorization: `Bearer ${paystack_secrete}` }
}
const createError = require('http-errors')

class paystackService {

    static async charge(data) {
        try {

            return await axios.post(`${url}/charge`, data, config)

        }catch (e) {
            throw createError.BadRequest(e.response.data.data.message)
        }
    }

    static async chargeAuthorization(data) {
        try {
            return await axios.post(`${url}/transaction/charge_authorization`, data, config)

        }catch (e) {
            throw createError.BadRequest(e.response.data.message)
        }
    }

    static async refund(data) {
        await axios({
            method: 'post',
            url: 'https://api.paystack.co/refund',
            headers: {
                Authorization: `Bearer ${paystack_secrete}`,
                'Content-Type': 'application/json',
            },
            data,
        })
    }

    static async getBanks() {
        return axios({
            method: 'get',
            url: 'https://api.paystack.co/bank'
        })
    }

    static async resolveAccount(payload) {
        await axios({
            method: 'get',
            url: `https://api.paystack.co/bank/resolve?account_number=${payload.account_number}&bank_code=${payload.bank_code}`,
            headers: {
                Authorization: `Bearer ${paystack_secrete}`,
                'Content-Type': 'application/json',
            }
        })
    }

    static async transferRecipient(data) {
        await axios({
        method: 'post',
        url: "https://api.paystack.co/transferrecipient",
        headers: {
            Authorization: `Bearer ${paystack_secrete}`,
            'Content-Type': 'application/json',
        },
        data,
        })
    }

    static async withdraw(data) {
        await axios({
            method: 'post',
            url: 'https://api.paystack.co/transfer',
            headers: {
                Authorization: `Bearer ${paystack_secrete}`,
                'Content-Type': 'application/json',
            },
            data,
        })
    }

}

module.exports = paystackService
