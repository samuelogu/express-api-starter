const routes = require('express').Router();
const postController = require('../controllers/postController')

routes.get('/', postController.all);

module.exports = routes;
