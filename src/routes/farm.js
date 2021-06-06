const routes = require('express').Router()
const farm = require('../controllers/farm.controller')

const auth = require('../middlewares/auth')

const validator = require('../middlewares/validator')
const schemas = require('../validators/farm.validator')

routes.post("/", [auth, validator(schemas.add, '')], farm.add)
routes.get("/", auth, farm.find)

module.exports = routes
