const jwt = require('../utils/jwt')
const createError = require('http-errors')

const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        throw createError.Unauthorized()
    }

    await jwt.verifyAccessToken(token).then(user => {
        req.user = user
        next()
    }).catch (e => {
        next(createError.Unauthorized(e.message))
    })

}

module.exports = auth;
