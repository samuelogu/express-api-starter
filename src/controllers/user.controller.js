const user = require('../services/user.service')
const createError = require('http-errors')
const jwt = require('../utils/jwt')
const redis = require('../middlewares/redis')

class userController {

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

    static refreshToken = async (req, res, next) => {

        const { refreshToken } = req.body;

        if (!refreshToken) return next(createError.NotFound('Refresh token not found'))

        await jwt.verifyRefreshToken(refreshToken).then(async data => {

            const user = data.payload
            const accessToken = await jwt.signAccessToken(user)
            // const refToken = await jwt.signRefreshToken(user)

            res.status(200).json({
                status: true,
                message: "Account token successful refreshed",
                data: { ...user, accessToken, refreshToken }
            })

        }).catch(e => {
            next(createError(e.statusCode, e.message))
        })

    }

    static logout = async (req, res, next) => {

        const { refreshToken } = req.body;

        if (!refreshToken) return next(createError.NotFound('Refresh token not found'))

        await jwt.verifyRefreshToken(refreshToken).then(async data => {

            const user = data.payload

            redis.DEL(user.id, (err, val) => {
                if (err) {
                    console.log(err.message)
                    next(createError.InternalServerError())
                }
                res.status(200).json({
                    status: true,
                    message: "Account successful logout"
                })
            })

        }).catch(e => {
            next(createError(e.statusCode, e.message))
        })

    }

}

module.exports = userController;
