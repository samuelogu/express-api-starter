const report = require('../services/report.service')
const createError = require('http-errors')
const moment = require('moment')

class reportController {

    static all = async (req, res, next) => {

        const { id } = req.user

        try {

            const data = await report.find(id)

            res.status(200).json({
                status: true,
                message: "User ponds",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static add = async (req, res, next) => {

        const { id } = req.user

        req.body.userId = id

        try {

            const data = await report.add(req.body)

            res.status(206).json({
                status: true,
                message: "Today's report successfully submitted",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

        static find = async (req, res, next) => {

            let { stock_id } = req.params

        try {

            function calculateFeedingPeriod(month) {
                let feeding_period
                switch (month) {
                    case 1:
                        feeding_period = '1 to 30'
                        break
                    case 2:
                        feeding_period = '31 to 60'
                        break
                    case 3:
                        feeding_period = '61 to 90'
                        break
                    case 4:
                        feeding_period = '91 to 120'
                        break
                    case 5:
                        feeding_period = '121 to 150'
                        break
                    case 6:
                        feeding_period = '151 to 180'
                        break
                    case 7:
                        feeding_period = '181 to 210'
                        break
                    case 8:
                        feeding_period = '211 to 240'
                        break
                }
                return feeding_period
            }

            const reports = await report.find(stock_id);
            const reportsD = await report.findReport(stock_id);
            const latestReport = reports ? reports.reverse()[0] : null
            const reportData = reportsD ? reportsD.reverse()[0] : null
            const checkDate = latestReport ? moment().diff(latestReport.createdAt, 'days') : null
            const isToday = checkDate === 0
            const day = isToday ? reports.length : reports.length + 1
            const month = parseInt((day / 30).toString().split(".")[0]) + 1
            const feeding_period = calculateFeedingPeriod(month)
            const feeding_day = parseInt(feeding_period.split(" ")[0])
            const feed_cost = latestReport ? latestReport.feed_cost : 0
            const fcr = latestReport ? latestReport.fcr : 0
            const body_weight_fed = latestReport ? latestReport.body_weight_fed : 0
            const daily_mortality = reportData ? reportData.daily_mortality : 0
            const feed_brand = latestReport ? latestReport.feed_brand : ''

            res.status(200).json({
                status: true,
                message: `Stock general report`,
                data: { reportData, day, month, isToday, feeding_day, feeding_period, feed_cost, fcr, feed_brand, body_weight_fed, daily_mortality }
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static update = async (req, res, next) => {

        const { id } = req.user

        req.body.userId = id

        try {

            const data = await report.update(req.body)

            res.status(200).json({
                status: true,
                message: "Today's report successfully updated",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static remove = async (req, res, next) => {

        const { id } = req.params

        try {
            await report.removePost(id)
            res.status(200).json({
                status: true,
                message: "report successfully removed",
                data: null
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

}

module.exports = reportController;
