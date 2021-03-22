const routes = require('express').Router();
const products = require('./products')
const auth = require('./auth')
const orders = require('./orders')
const createError = require('http-errors')

routes.all("/", (req, res)=> {

    res.status(200).json({
        status: true,
        message: "BSG API v1.0"
    })
})

routes.use('/products', products)
routes.use('/auth', auth)
routes.use('/orders', orders)

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
