const db = require('../connectors/knex')

class farmService {

    static async add(data) {
        const { width, depth, length } = data
        data.volume = ( width * depth * length ) * 1000
        return db.table('ponds').insert(data)
    }

    static async find(userId) {
        return db.table('ponds').where('userId', userId)
    }

}

module.exports = farmService;
