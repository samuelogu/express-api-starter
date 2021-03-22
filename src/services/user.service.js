const User = require("../models/User")
const createError = require('http-errors')

require('dotenv').config()

const jwt = require('../utils/jwt')
const bcrypt = require('bcryptjs')

class userService {

    static async register(data) {

        const { email } = data

        const check = await prisma.users.findUnique({
            where: { email }
        })

        if (check) {
            throw createError.Conflict('User with email address already exist')
        }

        data.password = bcrypt.hashSync(data.password, 8)

        const user = await prisma.users.create({ data })

        const accessToken = await jwt.signAccessToken(user)
        const refreshToken = await jwt.signRefreshToken(user)

        return { ...user, accessToken, refreshToken }

    }

    static async login(data) {

        const { email, password } = data

        const user = await prisma.users.findUnique({
            where: { email }
        })

        if (!user) {
            throw createError.NotFound('User not registered')
        }

        const checkPassword = bcrypt.compareSync(password, user.password)

        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')

        delete user.password

        const accessToken = await jwt.signAccessToken(user)
        const refreshToken = await jwt.signRefreshToken(user)

        return { ...user, accessToken, refreshToken }

    }

}

module.exports = userService;
