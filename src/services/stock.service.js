const db = require('../connectors/knex')

class farmService {

    static async add(data) {
        return db.table('farms').insert(data)
    }

    static async find(userId) {
        await db.table('stocks').where('userId', userId)
    }

}

module.exports = farmService;
