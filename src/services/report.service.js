const db = require('../connectors/knex')

class reportService {

    static async add(data) {
        return db.table('stocks').insert(data)
    }

    static async find(userId) {
        return db.table('stocks').where('userId', userId)
    }

}

module.exports = reportService;
