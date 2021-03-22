const routes = require('express').Router();
const post = require('./post')
const auth = require('./auth')
const createError = require('http-errors')

routes.all("/", (req, res)=> {

    res.status(200).json({
        status: true,
        message: "EXPRESS API v1.0"
    })
})

routes.use('/post', post)
routes.use('/auth', auth)

routes.use( async (req, res, next) => {
    next(createError.NotFound('Route not Found'))
})

routes.use( (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message
    })
})

module.exports = routes;
