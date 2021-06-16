const db = require('../connectors/knex')

class pondService {

    static async add(data) {
        const { width, depth, length } = data
        data.volume = ( width * depth * length ) * 1000
        return db.table('ponds').insert(data)
    }

    static async update(data) {
        const { width, depth, length, id } = data
        data.volume = ( width * depth * length ) * 1000
        await db.table('ponds').where('id', id).update(data)
        return data
    }

    static async find(userId) {
        return db.table('ponds').where('userId', userId)
    }

    static async findUserPond(id, userId) {
        return db.table('ponds').where('id', id).where('userId', userId)
    }

}

module.exports = pondService;
