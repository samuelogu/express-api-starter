const wallet = require('../services/wallet.service')
const userService = require('../services/user.service')
const createError = require('http-errors')

class walletController {

    static fund = async (req, res, next) => {

        const { id, email } = req.user

        req.body.userId = id
        req.body.email = email

        try {

            const data = wallet.chargeSavedCard(req.body)

            res.status(200).json({
                status: true,
                message: "Wallet successfully funded",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static getCards = async (req, res, next) => {

        const { id, name } = req.user

        try {

            const data = await userService.cards(id)

            res.status(206).json({
                status: true,
                message: `${name} cards`,
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static addCard = async (req, res, next) => {

        const { id, email } = req.user
        req.body.userId = id
        req.body.email = email

        try {

            const data = await wallet.addCard(req.body)

            res.status(206).json({
                status: true,
                message: `Card successfully added`,
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

}

module.exports = walletController;
