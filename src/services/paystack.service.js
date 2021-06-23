const paystack_secrete = process.env.PAYSTACK_SECRETE_KEY


class paystackService {

    async chargeConfig(data) {
        return {
            method: 'post',
            url: 'https://api.paystack.co/charge',
            headers: {
                Authorization: `Bearer ${paystack_secrete}`,
                'Content-Type': 'application/json',
            },
            data
        }
    }

    async refundConfig(data) {
        return {
            method: 'post',
            url: 'https://api.paystack.co/refund',
            headers: {
                Authorization: `Bearer ${paystack_secrete}`,
                'Content-Type': 'application/json',
            },
            data,
        }
    }

    async getBanks() {
        return {
            method: 'get',
            url: 'https://api.paystack.co/bank'
        }
    }

    async resolveAccount(payload) {
        return {
            method: 'get',
            url: `https://api.paystack.co/bank/resolve?account_number=${payload.account_number}&bank_code=${payload.bank_code}`,
            headers: {
                Authorization: `Bearer ${paystack_secrete}`,
                'Content-Type': 'application/json',
            }
        }
    }
    
    async transferRecipient(data) {
        return {
        method: 'post',
        url: "https://api.paystack.co/transferrecipient",
        headers: {
            Authorization: `Bearer ${paystack_secrete}`,
            'Content-Type': 'application/json',
        },
        data,
        }
    }

    async withdraw(data) {
        return {
            method: 'post',
            url: 'https://api.paystack.co/transfer',
            headers: {
                Authorization: `Bearer ${paystack_secrete}`,
                'Content-Type': 'application/json',
            },
            data,
        }
    }
    
}

module.exports = paystackService
