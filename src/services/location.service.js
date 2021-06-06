const db = require('../connectors/knex')
const randomstring = require("randomstring")
const createError = require('http-errors')
const EmailSender = require('../utils/email.sender')
const emailSender = new EmailSender()

require('dotenv').config()

const jwt = require('../utils/jwt')
const bcrypt = require('bcryptjs')

class locationService {

    static async getStates() {
        return db.table('states').orderBy('name', 'asc')
    }

    static async getCities(state_id) {
        return db.table('cities').where('stateId', state_id)
    }

}

module.exports = locationService;
