const redis = require('../connectors/redis')
const createError = require('http-errors')

module.exports = {

    add(key, values) {

        return new Promise(async (resolve, reject) => {
            redis.get(key, function(err, redisData) {

                let data = []

                if (redisData) data = JSON.parse(redisData)

                data.push(values)

                data = JSON.stringify(data)

                redis.set(key, data, (err, reply) => {
                    if (err) {
                        console.log(err.message);
                        return reject(createError.InternalServerError())
                    }
                    resolve(reply)
                })
            })
        })

    },
    get(key) {

        return new Promise(async (resolve, reject) => {

            redis.get('refresh_tokens', (err, reply) => {

                if (err) {
                    console.log('error', err.message)
                    reject(createError.BadRequest('Invalid refresh token'))
                }

                const data = JSON.parse(reply)

                const payload = data.filter(value => {
                    return value === key
                })

                if (!payload.length) return reject(createError.BadRequest('Invalid refresh token'))
                resolve(payload[0])

            })

        })

    },
    remove(key) {
        return new Promise(async (resolve, reject) => {

            redis.get('refresh_tokens', (err, reply) => {

                if (err) {
                    console.log('error', err.message)
                    return reject(createError.InternalServerError())
                }

                const data = JSON.parse(reply)
                const index = data.indexOf(key)
                data.splice(index, 1)

                const refresh_tokens = JSON.stringify(data)

                redis.set('refresh_tokens', refresh_tokens, (err, reply) => {
                    if (err) {
                        return reject(createError.InternalServerError())
                    }
                    resolve(reply)
                })

            })

        })
    }

}
