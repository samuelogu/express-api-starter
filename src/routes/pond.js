const routes = require('express').Router();
const pond = require('../controllers/pond.controller')
const auth = require('../middlewares/auth')

const validator = require('../middlewares/validator')
const schemas = require('../validators/pond.validator')

routes.get('/', auth, pond.find)
routes.post("/", [auth, validator(schemas.add)], auth, pond.add)

module.exports = routes;
