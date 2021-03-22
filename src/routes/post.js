const routes = require('express').Router();
const post = require('../controllers/post.controller')
const auth = require('../middlewares/auth')

routes.get('/', auth, post.all)
routes.post("/", auth, post.create)
routes.get("/:id", auth, post.find)
routes.delete("/:id", auth, post.remove)
routes.put("/:id", auth, post.update)

module.exports = routes;
