const pond = require('../services/pond.service')
const createError = require('http-errors')

class pondController {

    static all = async (req, res, next) => {

        const { id } = req.user

        try {

            const data = await pond.find(id)

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

            const data = await pond.add(req.body)

            res.status(206).json({
                status: true,
                message: "pond successfully created",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

        static find = async (req, res, next) => {

        const { name, id } = req.user

        try {
            const data = await pond.find(id)

            res.status(200).json({
                status: true,
                message: `${name} pond`,
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
            const data = await pond.updatePost(id, title, body)
            res.status(200).json({
                status: true,
                message: "pond successfully updated",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static remove = async (req, res, next) => {

        const { id } = req.params

        try {
            await pond.removePost(id)
            res.status(200).json({
                status: true,
                message: "pond successfully removed",
                data: null
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

}

module.exports = pondController;
