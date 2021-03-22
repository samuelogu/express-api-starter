const routes = require('express').Router();
const post = require('../controllers/post.controller')
const auth = require('../middlewares/auth')

const validator = require('../middlewares/validator')
const schemas = require('../validators/post.validator')

routes.get('/', auth, post.all)
routes.post("/", [auth, validator(schemas.create)], auth, post.create)
routes.get("/:id", [auth, validator(schemas.find, 'params')], post.find)
routes.delete("/:id", auth, post.remove)
routes.put("/:id", auth, post.update)

module.exports = routes;
