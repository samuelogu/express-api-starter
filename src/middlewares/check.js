const userService = require('../services/user.service')
const pondService = require('../services/pond.service')
const stockService = require('../services/stock.service')
const createError = require('http-errors')
const db = require('../connectors/knex')

module.exports = {

    async email (req, res, next) {

        const { email } = req.body

        const checkEmail = await userService.findByEmail(email)

        if (checkEmail.length) return next(createError.NotFound('Account with email address already exist'))

        req.user = checkEmail[0]
        next()

    },

    async emailExist (req, res, next) {

        const { email } = req.params

        const checkEmail = await userService.findByEmail(email)

        if (checkEmail.length) return next(createError.Conflict('Account with email address already exist'))

        req.user = checkEmail[0]
        next()

    },

    async usernameExist (req, res, next) {

        const { username } = req.params

        const checkUsername = await userService.findByUsername(username)

        if (checkUsername.length) return next(createError.Conflict('Account with username already exist'))

        req.user = checkUsername[0]
        next()

    },

    async user(req, res, next) {

        let { user_id } = req.params

        const check = await userService.find(user_id)

        if (!check.length) return next(createError.BadRequest('Invalid user ID'))

        next()

    },

    async pondId(req, res, next) {

        let { id } = req.params
        let userId = req.user.id

        const check = await pondService.findUserPond(id, userId)

        if (!check.length) return next(createError.BadRequest('Invalid pond ID'))

        req.body.id = id
        next()

    },

    async stockId(req, res, next) {

        let { stock_id } = req.params
        let userId = req.user.id

        const check = await stockService.findUserStock(stock_id, userId)

        if (!check.length) return next(createError.BadRequest('Invalid stock ID'))

        next()

    },

    async wallet(req, res, next) {

        const { id } = req.user
        const user = await db.table('users').where('id', id)
        const wallet = user[0].wallet

        if (wallet < 50) return next(createError.BadRequest('Insufficient funds in your wallet'))

        next()

    },

    async authorizationCode(req, res, next) {

        const { id } = req.user
        const { authorization_code } = req.body

        const card = await db.table('cards').where('userId', id).where('authorization_code', authorization_code)

        if (!card.length) return next(createError.BadRequest('Invalid card authorization code'))

        next()

    },

    async cardId(req, res, next) {

        const { id } = req.user
        const { card_id } = req.params
        const card = await db.table('cards').where('userId', id).where('id', card_id)

        if (!card.length) return next(createError.BadRequest('Invalid card ID'))

        next()

    }

}
