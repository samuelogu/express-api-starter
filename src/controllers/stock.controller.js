const stock = require('../services/stock.service')
const createError = require('http-errors')

class stockController {

    static all = async (req, res, next) => {

        const { id } = req.user

        try {

            const data = await stock.find(id)

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

            const data = await stock.add(req.body)

            res.status(206).json({
                status: true,
                message: "stock successfully added",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

        static find = async (req, res, next) => {

        const { name, id } = req.user

        try {
            const data = await stock.find(id)

            res.status(200).json({
                status: true,
                message: `${name} stocks`,
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static update = async (req, res, next) => {

        const { body, title } = req.body
        const { id } = req.params

        try {
            const data = await stock.updatePost(id, title, body)
            res.status(200).json({
                status: true,
                message: "stock successfully updated",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static remove = async (req, res, next) => {

        const { id } = req.params

        try {
            await stock.removePost(id)
            res.status(200).json({
                status: true,
                message: "stock successfully removed",
                data: null
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

}

module.exports = stockController;