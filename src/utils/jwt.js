const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const redis = require('../connectors/redis')
const r_uti = require('../utils/redis')
const db = require('../connectors/knex')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const accessTokenExpires = process.env.ACCESS_TOKEN_LIFE
const refreshTokenExpires = process.env.REFRESH_TOKEN_LIFE
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
const issuer = process.env.TOKEN_ISSUER

module.exports = {

    signAccessToken(payload){
        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, accessTokenSecret, {
                expiresIn: accessTokenExpires,
                issuer, audience: payload.email
            }, (err, token) => {
                if (err) {
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken(token){
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecret, async (err, payload) => {
                if (err) {
                    const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return reject(createError.Unauthorized(message))
                }
                const tokenIssuer = payload.iss
                const audience = payload.aud
                if (issuer !== tokenIssuer) return reject(createError.Unauthorized('Unauthorized'))
                const user = await db.table('users').where('email', audience)
                if (!user.length) return reject(createError.Unauthorized('Unauthorized'))
                resolve(payload)
            })
        })
    },
    signRefreshToken(payload){

        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, refreshTokenSecret, {
                expiresIn: refreshTokenExpires,
                issuer, audience: payload.email
            }, (err, token) => {
                if (err) {
                    reject(createError.InternalServerError())
                }

                r_uti.add('refresh_tokens', token).then(() => {
                    resolve(token)
                }).catch(err => {
                    console.log(err.message);
                    reject(createError.InternalServerError())
                })

            })
        })

    },
    verifyRefreshToken(token){
        return new Promise((resolve, reject) => {
            jwt.verify(token, refreshTokenSecret, async (err, data) => {

                if (err) {
                    const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return reject(createError.Unauthorized(message))
                }

                try {
                    await r_uti.get(token)
                    resolve(data)
                }catch (e) {
                    reject(createError(e.statusCode, e.message))
                }

            })
        })
    },
    removeRefreshToken(token) {
        return new Promise(async (resolve, reject) => {
            try {
                await r_uti.remove(token)
                resolve(true)
            }catch (e) {
                reject(createError(e.statusCode, e.message))
            }
        })
    }

}
