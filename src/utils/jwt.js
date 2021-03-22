const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const redis = require('../connectors/redis')

require('dotenv').config()

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
            jwt.verify(token, accessTokenSecret, (err, payload) => {
                if (err) {
                    const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return reject(createError.Unauthorized(message))
                }
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

                redis.SET(payload._id, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
                    if (err) {
                        console.log(err.message);
                        reject(createError.InternalServerError())
                        return
                    }
                    resolve(token)
                })
            })
        })
    },
    verifyRefreshToken(token){
        return new Promise((resolve, reject) => {
            jwt.verify(token, refreshTokenSecret, (err, data) => {
                if (err) {
                    const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return reject(createError.Unauthorized(message))
                }

                redis.GET(data.payload._id, (err, reply) => {

                    if (err) {
                        console.log('error', err.message)
                        reject(createError.InternalServerError())
                        return
                    }

                    if (reply === token) return resolve(data)
                    reject(createError.Unauthorized())

                })

            })
        })
    }

}
