const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class productService {

    static async getProduct() {
        return await prisma.products.findMany()
    }

    static async findProduct(id) {
        return await prisma.findOne({ id })
    }

    static async createProduct(title, body) {
        const post = new prisma({
            title, body
        })
        await post.save()
        return post
    }

    static async updateProduct(id, title, body) {
        const post = await prisma.findOne({ id })

        post.body = body && body
        post.title = title && title

        await post.save()
        return post
    }

    static async removeProduct(id) {
        return await prisma.deleteOne({ id })
    }


}

module.exports = productService;
