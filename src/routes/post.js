const routes = require('express').Router();
const postController = require('../controllers/postController')

routes.get('/', postController.all)
routes.post("/", postController.create)
routes.get("/:id", postController.find)
routes.delete("/:id", postController.remove)
routes.put("/:id", postController.update)

module.exports = routes;
