const Post = require("../models/Post")

class postService {

    static async getPost() {
        return await Post.find()
    }

    static async findPost(_id) {
        return await Post.findOne({ _id })
    }

    static async createPost(title, body) {
        const post = new Post({
            title, body
        })
        await post.save()
        return post
    }

    static async updatePost(_id, title, body) {
        const post = await Post.findOne({ _id })

        post.body = body && body
        post.title = title && title

        await post.save()
        return post
    }

    static async removePost(_id) {
        return await Post.deleteOne({ _id })
    }


}

module.exports = postService;
