const post = require('../services/post')

class postController {

    static all = async (req,res) => {
        res.json({
            status: true,
            message: 'All post',
            data: [
                {
                    id: 1,
                    title: 'Post one'
                }
            ]
        })
    }


}

module.exports = postController;
