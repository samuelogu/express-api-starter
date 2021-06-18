const db = require('../connectors/knex')

class reportService {

    static async add(data) {
        return db.table('stocks').insert(data)
    }

    static async find(id) {
        return db.table('general_reports').where('stockId', id)
    }

    static async reportCount(id) {
        return db.table('reports').where('stockId', id)
    }

}

module.exports = reportService;
