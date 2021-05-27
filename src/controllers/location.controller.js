const post = require('../services/post.service')
const createError = require('http-errors')
const location = require('../services/location.service')

class locationController {

    static states = async (req, res, next) => {

        try {
            const data = await location.getStates()
            res.status(200).json({
                status: true,
                message: "All states",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

    static cities = async (req, res, next) => {

        const { state_id } = req.params

        try {
            const data = await location.getCities(state_id)
            res.status(200).json({
                status: true,
                message: "State cities",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }

    }

}

module.exports = locationController;
