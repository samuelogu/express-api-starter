const db = require('../connectors/knex')

class stockService {

    static async add(data) {
        return db.table('stocks').insert(data)
    }

    static async find(userId) {
        return db.table('stocks').where('userId', userId)
    }

    static async get(stockId) {
        return db.table('stocks').where('id', stockId)
    }

    static async findUserStock(id, userId) {
        return db.table('stocks').where('id', id).where('userId', userId)
    }

}

module.exports = stockService;
