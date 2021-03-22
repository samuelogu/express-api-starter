const post = require('../services/post.service')
const createError = require('http-errors')

class postController {

    static all = async (req, res, next) => {

        try {
            const data = await post.getPost()
            res.status(200).json({
                status: true,
                message: "All posts",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static create = async (req, res, next) => {

        const { body, title } = req.body

        try {
            const data = await post.createPost(title, body)
            res.status(206).json({
                status: true,
                message: "Post successfully created",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static find = async (req, res, next) => {

        const { id } = req.params

        try {
            const data = await post.findPost(id)
            res.status(200).json({
                status: true,
                message: "Post found",
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
            const data = await post.updatePost(id, title, body)
            res.status(200).json({
                status: true,
                message: "Post successfully updated",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static remove = async (req, res, next) => {

        const { id } = req.params

        try {
            await post.removePost(id)
            res.status(200).json({
                status: true,
                message: "Post successfully removed",
                data: null
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

}

module.exports = postController;
