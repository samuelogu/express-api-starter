const userService = require('../services/user.service')
const createError = require('http-errors')

module.exports = {

    async email (req, res, next) {

        const { email } = req.body

        const checkEmail = await userService.findByEmail(email)

        if (checkEmail.length) return next(createError.NotFound('Account with email address already exist'))

        req.user = checkEmail[0]
        next()

    },

    async username (req, res, next) {

        const { username } = req.body

        const checkUsername = await userService.findByUsername(username)

        if (checkUsername.length) return next(createError.NotFound('Account with username already exist exist'))

        req.user = checkUsername[0]
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

    }

}
