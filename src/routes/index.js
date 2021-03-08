const routes = require('express').Router();
const postRoutes = require('./post')

routes.all("/", (req, res)=> {

    res.status(200).json({
        status: true,
        message: "Express API starter"
    })
})

routes.use('/posts', postRoutes);


routes.all("*", (req, res)=> {
    res.status(404).json({
        status: false,
        message: "Route not Found"
    })
})

module.exports = routes;
