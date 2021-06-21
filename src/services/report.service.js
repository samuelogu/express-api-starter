const db = require('../connectors/knex')
const stockService = require('./stock.service')
const randomstring = require("randomstring")

class reportService {

    static async add(data) {
        const { stockId } = data
        const report = await this.findReport(stockId)
        const previousReport = report ? report.reverse()[0] : null
        const calculatedData = await this.calculateData(data, previousReport)
        const { month, feeding_day, feeding_period, feed_brand, feed_cost, fcr, body_weight_fed } = calculatedData
        const general_report = {
            stockId, month, feeding_day, feeding_period, feed_brand, feed_cost, fcr, body_weight_fed
        }
        report.length ? await this.updateReport(general_report) : await this.addReport(general_report)

        delete calculatedData.feeding_day
        delete calculatedData.feed_brand
        delete calculatedData.feeding_period
        delete calculatedData.feed_cost
        delete calculatedData.userId
        delete calculatedData.fcr
        delete calculatedData.body_weight_fed

        return db.table('reports').insert(calculatedData)

    }

    static async update(data) {
        const { stockId } = data
        const report = await this.findReport(stockId)
        const g_r = await this.find(stockId)
        const previousReport = report ? report.reverse()[0] : null
        const { id } = previousReport
        const calculatedData = await this.calculateData(data, previousReport)

        const { month, feeding_day, feeding_period, feed_brand, feed_cost, fcr, body_weight_fed } = calculatedData
        const general_report = {
            stockId, month, feeding_day, feeding_period, feed_brand, feed_cost, fcr, body_weight_fed
        }
        g_r.length ? await this.updateReport(general_report) : await this.addReport(general_report)

        delete calculatedData.feeding_day
        delete calculatedData.feed_brand
        delete calculatedData.feeding_period
        delete calculatedData.feed_cost
        delete calculatedData.userId
        delete calculatedData.fcr
        delete calculatedData.body_weight_fed

        return db.table('reports').where('id', id).update(calculatedData)

    }

    static async calculateData(data, previousReport) {

        const { daily_mortality, stockId } = data
        const stock = await stockService.get(stockId)
        const { quantity, weight } = stock[0]
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

    static async findReport(id) {
        return db.table('reports').where('stockId', id)
    }

    static async reportCount(id) {
        return db.table('reports').where('stockId', id)
    }

    static async download(data) {
        const wallet = data.wallet - 50
        // await db.table('users').where('id', data.userId).update({ wallet })
        data.reference = randomstring.generate()
        console.log(data);
        // return db.table('downloads').insert(data)
    }

}

module.exports = reportService;
