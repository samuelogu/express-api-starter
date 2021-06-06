const db = require('../connectors/knex')

class farmService {

    static async add(data) {
        const { userId } = data
        await db.table('users').where('id', userId).update({
            farm: 1
        })
        return db.table('farms').insert(data)
    }

    static async find(userId) {
        await db.table('farms').where('userId', userId)
    }

}

module.exports = farmService;
