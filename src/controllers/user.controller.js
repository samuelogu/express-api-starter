const user = require('../services/user.service')
const createError = require('http-errors')
const jwt = require('../utils/jwt')

class userController {

    static verify = async (req, res, next) => {

        const { token } = req.params

        try {

            await user.checkVerificationToken(token)

            res.status(200).json({
                status: true,
                message: "Account successfully verified"
            })

        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static register = async (req, res, next) => {

        try {

            const data = await user.register(req.body)

            res.status(200).json({
                status: true,
                message: "Account successfully created",
                data
            })

        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static checkEmail = async (req, res, next) => {

        res.status(200).json({
            status: true,
            message: "No account with email address",
            data: null
        })
    }

    static checkUsername = async (req, res, next) => {

        res.status(200).json({
            status: true,
            message: "No account with username",
            data: null
        })
    }

    static login = async (req, res, next) => {

        try {

            const data = await user.login(req.body)

            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            })

        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static resetPassword = async (req, res, next) => {

        try {

            await user.resetPassword(req.body)

            res.status(200).json({
                status: true,
                message: 'Password successfully reset'
            })

        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static forgotPassword = async (req, res, next) => {

        const { email } = req.body

        try {

            await user.forgotPassword(req.user)

            res.status(200).json({
                status: true,
                message: `Reset link successfully sent to ${email}`
            })

        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static changePassword = async (req, res, next) => {

        const { password } = req.body

        try {
            const data = await user.changePassword({
                id: req.user.id, password
            })
            res.status(200).json({
                status: true,
                message: `Reset link successfully sent to ${email}`,
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static refreshToken = async (req, res, next) => {

        const { refresh_token } = req.body

        if (!refresh_token) return next(createError.NotFound('Refresh token not found'))

        await jwt.verifyRefreshToken(refresh_token).then(async data => {

            const user = data.payload
            const accessToken = await jwt.signAccessToken(user)

            res.status(200).json({
                status: true,
                message: "Account token successful refreshed",
                data: { ...user, accessToken, refreshToken: refresh_token }
            })

        }).catch(e => {
            next(createError(e.statusCode, e.message))
        })

    }

    static suggestion = async (req, res, next) => {

        const { type } = req.params


        try {

            const data = await user.suggestion(req.user, type)

            res.status(200).json({
                status: true,
                message: `User suggestions for ${type}`,
                data
            })

        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static addSuggestion = async (req, res, next) => {

        const { type } = req.params

        try {

            await user.addSuggestion(req.user, type, req.body)

            res.status(200).json({
                status: true,
                message: `User suggestions successfully added`
            })

        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static logout = async (req, res, next) => {

        const { refresh_token } = req.body;

        if (!refresh_token) return next(createError.NotFound('Refresh token not found'))

        await jwt.verifyRefreshToken(refresh_token).then(async data => {

            const user = data.payload

            if (user.email !== req.user.email) return next(createError.Unauthorized())

            await jwt.removeRefreshToken(refresh_token)

            res.status(200).json({
                status: true,
                message: "Account successful logged out"
            })

        }).catch(e => {
            next(createError(e.statusCode, e.message))
        })

    }

    static followers = async (req, res, next) => {

        const { user_id } = req.params


        try {

            const data = await user.followers(req.user.id, user_id)

            res.status(200).json({
                status: true,
                message: 'User followers',
                data
            })

        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static following = async (req, res, next) => {

        const { user_id } = req.params


        try {

            const data = await user.following(req.user.id, user_id)

            res.status(200).json({
                status: true,
                message: 'User following',
                data
            })

        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static polls = async (req, res, next) => {

        const { user_id } = req.params


        try {

            const data = await user.polls(req.user.id, user_id)

            res.status(200).json({
                status: true,
                message: 'User polls',
                data
            })

        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

}

module.exports = userController;
