const Post = require("../models/Post")

class postService {

    static async getPost() {
        return Post.find()
    }

    static async findPost(_id) {
        return Post.findOne({ _id })
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

        return post.save()
    }

    static async removePost(_id) {
        return Post.deleteOne({ _id })
    }


}

module.exports = postService;
