const routes = require('express').Router();
const stock = require('../controllers/stock.controller')
const auth = require('../middlewares/auth')

const validator = require('../middlewares/validator')
const schemas = require('../validators/stock.validator')

routes.get('/', auth, stock.find)
routes.post("/", [auth, validator(schemas.add)], stock.add)

module.exports = routes;
