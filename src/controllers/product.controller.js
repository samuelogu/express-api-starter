const product = require('../services/product.service')

class productController {

    static all = async (req, res) => {

        try {
            const data = await product.getProduct()
            res.status(200).json({
                status: true,
                message: "All products",
                data
            })
        } catch (e) {
            res.status(400).json({
                status: false,
                message: "Unable to retrieve product"
            })
        }

    }

    static create = async (req, res) => {

        const { body, title } = req.body

        try {
            const data = await product.createProduct(title, body)
            res.status(206).json({
                status: true,
                message: "Product successfully created",
                data
            })
        } catch (e) {
            res.status(400).json({
                status: false,
                message: "Unable to create product"
            })
        }

    }

    static find = async (req, res) => {

        const { id } = req.params

        try {
            const data = await product.findProduct(id)
            res.status(200).json({
                status: true,
                message: "Product found",
                data
            })
        } catch (e) {
            res.status(404).json({
                status: false,
                message: "Product doesn't exist!"
            })
        }

    }

    static update = async (req, res) => {

        const { body, title } = req.body
        const { id } = req.params

        try {
            const data = await product.updateProduct(id, title, body)
            res.status(200).json({
                status: true,
                message: "Product successfully updated",
                data
            })
        } catch (e) {
            res.status(404).json({
                status: false,
                message: "Unable to update product"
            })
        }

    }

    static remove = async (req, res) => {

        const { id } = req.params

        try {
            await product.removeProduct(id)
            res.status(200).json({
                status: true,
                message: "Product successfully removed",
                data: null
            })
        } catch (e) {
            res.status(404).json({
                status: false,
                message: "Unable to remove product"
            })
        }

    }

}

module.exports = productController;
