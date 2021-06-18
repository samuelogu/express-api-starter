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
                message: "report successfully added",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

        static find = async (req, res, next) => {

            let { stock_id } = req.params

        try {

            const reports = await report.find(stock_id);
            const latestReport = reports ? reports.reverse()[0] : null
            const checkDate = latestReport ? moment().diff(latestReport.createdAt, 'days') : null
            const isToday = checkDate === 0
            const day = reports.length + 1
            const month = parseInt((day / 30).toString().split(".")[0]) + 1

            res.status(200).json({
                status: true,
                message: `Stock general report`,
                data: { reports, day, month, isToday }
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static update = async (req, res, next) => {

        const { body, title } = req.body
        const { id } = req.params

        try {
            const data = await report.updatePost(id, title, body)
            res.status(200).json({
                status: true,
                message: "report successfully updated",
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
