const db = require('../connectors/knex')
const stockService = require('./stock.service')

class reportService {

    static async add(data) {
        const { stockId } = data
        const report = await this.find(stockId)
        const calculatedData = await this.calculateData(data, report)

        report ? await this.updateReport(calculatedData) : await this.addReport(calculatedData)


        return db.table('stocks').insert(calculatedData)

    }

    static async calculateData(data, report) {

        const { daily_mortality, stockId } = data
        const stock = await stockService.get(stockId)
        const { quantity, weight } = stock
        const previousReport = report ? report.reverse()[0] : null
        data.cumulative_mortality = previousReport ? previousReport.cumulative_mortality + daily_mortality : 0
        data.present_quantity = quantity - data.cumulative_mortality
        data.average_weight = previousReport ? (previousReport.total_weight + previousReport.total_weight_gain) / previousReport.present_quantity : weight
        data.total_weight = data.present_quantity * weight
        data.feed_gift = data.total_weight * data.body_weight_fed
        data.feed_gift_kg = data.feed_gift / 1000
        data.cumulative_feed_gift = data.feed_gift_kg / 15
        data.cumulative_feed_gift_kg = data.cumulative_feed_gift / 1000
        data.cumulative_feed_gift_bag = data.cumulative_feed_gift_kg / 15
        data.feed_cost_kg = data.feed_gift * (data.feed_cost / 15)
        data.cumulative_feed_cost = data.cumulative_feed_gift_bag * data.feed_cost
        data.total_weight_gain = data.feed_gift * data.fcr
        return data

    }

    static async updateReport(data) {
        return db.table('general_reports').where('stockId', data.stockId).update(data)
    }

    static async addReport(data) {
        return db.table('general_reports').insert(data)
    }

    static async find(id) {
        return db.table('general_reports').where('stockId', id)
    }

    static async reportCount(id) {
        return db.table('reports').where('stockId', id)
    }

}

module.exports = reportService;
