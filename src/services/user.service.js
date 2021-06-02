const db = require('../connectors/knex')
const randomstring = require("randomstring")
const createError = require('http-errors')
const EmailSender = require('../utils/email.sender')
const emailSender = new EmailSender()

require('dotenv').config()

const jwt = require('../utils/jwt')
const bcrypt = require('bcryptjs')

class userService {

    static async register(data) {

        const SALT_ROUNDS = 10;
        const SALT = bcrypt.genSaltSync(SALT_ROUNDS)
        const passwordUnencrypted = data.password

        data.password = bcrypt.hashSync(data.password, SALT)
        data.verification_token = randomstring.generate()

        await db.table('users').insert(data)

        let emailSender = new EmailSender()

        emailSender.setReceiver(data.email).setSubject('Account Verification').sendHtml('account-verification', { token: data.verification_token })

        data.password = passwordUnencrypted

        return this.login(data)

    }

    static async login(data) {

        const { email, password } = data

        let user

        const checkEmail = await this.findBy('email', email)

        user = checkEmail[0]

        const checkPassword = bcrypt.compareSync(password, user.password)

        if (!checkPassword) throw createError.Unauthorized('Invalid account details')

        delete user.password
        delete user.refreshToken
        delete user.token
        delete user.verification_token

        const accessToken = await jwt.signAccessToken(user)
        const refreshToken = await jwt.signRefreshToken(user)

        return { ...user, accessToken, refreshToken }

    }

    static async verify(email) {

        await db.table('users').where('email', email).update({
            account_verified: 1,
            verification_token: ''
        })

    }

    static async checkVerificationToken(token) {
        const user = await this.findBy('verification_token', token)
        if (!user.length) throw createError.Unauthorized('Invalid verification token')
        const email = user[0].email
        await this.verify(email)
    }

    static async find(id) {
        return db.table('users').where('id', id)
    }

    static async findByEmail(email) {
        return db.table('users').where('email', email)
    }


    static async details(user_id) {
        return db.table('users').where('users.id', user_id).join('Profiles', 'users.id', '=', 'Profiles.user_id').select('users.id', 'first_name', 'last_name', 'username', 'profile_picture')
    }

    static async findBy(columnName, value) {
        return db.from('users').where(columnName, value)
    }

    static async forgotPassword(user) {

        const token = randomstring.generate()

        await db.table('PasswordResets').insert({
            user_id: user.id,
            token
        })

        emailSender.setReceiver(user.email).setSubject('Password reset').sendHtml('password-reset', { token })

        return true

    }

    static async resetPassword(data) {

        const { token } = data

        const user = await db.table('PasswordResets').join('users', 'PasswordResets.user_id', '=', 'users.id').where('token', token).select('email')

        if (!user.length) throw createError.BadRequest('Invalid password reset token')

        const password = this.encryptPassword(data.password)

        await db.table('users').where('email', user[0].email).update({
            password
        })

    }

    static encryptPassword(password) {
        const SALT_ROUNDS = 10;
        const SALT = bcrypt.genSaltSync(SALT_ROUNDS)
        return bcrypt.hashSync(password, SALT)
    }

    static async changePassword(data) {

        const SALT_ROUNDS = 10;
        const SALT = bcrypt.genSaltSync(SALT_ROUNDS)

        const password = bcrypt.hashSync(data.password, SALT)

        await db.table('users').where('id', data.id).update({
            password
        })

        return true

    }

}

module.exports = userService;
