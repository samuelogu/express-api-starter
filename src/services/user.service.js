const User = require("../models/User")
const createError = require('http-errors')

require('dotenv').config()

const jwt = require('../utils/jwt')
const bcrypt = require('bcryptjs')

class userService {

    static async register(data) {

        const { email } = data

        const check = await User.findOne({ email })

        if (check) {
            throw createError.Conflict('User with email address already exist')
        }

        data.password = bcrypt.hashSync(data.password, 8)

        const newUser = new User(data)
        const user = await newUser.save()
        delete data.password

        data.accessToken = await jwt.signAccessToken(user)
        data.refreshToken = await jwt.signRefreshToken(user)

        return data

    }

    static async login(data) {

        const { email, password } = data

        const user = await User.findOne({ email })

        if (!user) {
            throw createError.NotFound('User not registered')
        }

        const checkPassword = bcrypt.compareSync(password, user.password)

        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')

        delete user.password

        const accessToken = await jwt.signAccessToken(user)
        const refreshToken = await jwt.signRefreshToken(user)

        return { ...user._doc, accessToken, refreshToken }

    }

}

module.exports = userService;
