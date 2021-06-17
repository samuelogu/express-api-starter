const routes = require('express').Router();
const report = require('../controllers/report.controller')
const auth = require('../middlewares/auth')

const validator = require('../middlewares/validator')
const schemas = require('../validators/report.validator')

routes.get('/', auth, report.find)
routes.post("/", [auth, validator(schemas.add)], report.add)

module.exports = routes;
