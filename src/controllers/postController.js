const post = require('../services/postService')

class postController {

    static all = async (req, res) => {

        try {
            const data = await post.getPost()
            res.status(200).json({
                status: true,
                message: "All posts",
                data
            })
        } catch (e) {
            res.status(400).json({
                status: false,
                message: "Unable to retrieve post"
            })
        }

    }

    static create = async (req, res) => {

        const { body, title } = req.body

        try {
            const data = await post.createPost(title, body)
            res.status(206).json({
                status: true,
                message: "Post successfully created",
                data
            })
        } catch (e) {
            res.status(400).json({
                status: false,
                message: "Unable to create post"
            })
        }

    }

    static find = async (req, res) => {

        const { id } = req.params

        try {
            const data = await post.findPost(id)
            res.status(200).json({
                status: true,
                message: "Post found",
                data
            })
        } catch (e) {
            res.status(404).json({
                status: false,
                message: "Post doesn't exist!"
            })
        }

    }

    static update = async (req, res) => {

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
            res.status(404).json({
                status: false,
                message: "Unable to update post"
            })
        }

    }

    static remove = async (req, res) => {

        const { id } = req.params

        try {
            await post.removePost(id)
            res.status(200).json({
                status: true,
                message: "Post successfully removed",
                data: null
            })
        } catch (e) {
            res.status(404).json({
                status: false,
                message: "Unable to remove post"
            })
        }

    }

}

module.exports = postController;
