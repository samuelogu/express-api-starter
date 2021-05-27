const routes = require('express').Router()
const location = require('../controllers/location.controller')
const validator = require('../middlewares/validator')
const schemas = require('../validators/location.validator')

routes.get("/states", location.states)
routes.get("/cities/:state_id", [validator(schemas.cities, 'params')], location.cities)

module.exports = routes
