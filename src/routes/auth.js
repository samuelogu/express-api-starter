const routes = require('express').Router();
const user = require('../controllers/user.controller')
const validator = require('../middlewares/validator')
const schemas = require('../validators/user.validator')

routes.post("/register", validator(schemas.register), user.register)
routes.post("/login", validator(schemas.login), user.login)
routes.post("/refresh-token", user.refreshToken)
routes.delete("/logout", user.logout)

module.exports = routes;
