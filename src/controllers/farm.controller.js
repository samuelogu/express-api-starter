const farm = require('../services/farm.service')
const createError = require('http-errors')

class farmController {

    static all = async (req, res, next) => {

        try {
            const data = await farm.getPost()
            res.status(200).json({
                status: true,
                message: "All posts",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static add = async (req, res, next) => {

        const { body, title } = req.body

        try {
            const data = await farm.createPost(title, body)
            res.status(206).json({
                status: true,
                message: "farm successfully created",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static find = async (req, res, next) => {

        const { id } = req.params

        try {
            const data = await farm.findPost(id)
            res.status(200).json({
                status: true,
                message: "farm found",
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
            const data = await farm.updatePost(id, title, body)
            res.status(200).json({
                status: true,
                message: "farm successfully updated",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static remove = async (req, res, next) => {

        const { id } = req.params

        try {
            await farm.removePost(id)
            res.status(200).json({
                status: true,
                message: "farm successfully removed",
                data: null
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

}

module.exports = farmController;
