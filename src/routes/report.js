const routes = require('express').Router();
const report = require('../controllers/report.controller')
const auth = require('../middlewares/auth')

const check = require('../middlewares/check')
const validator = require('../middlewares/validator')
const schemas = require('../validators/report.validator')

routes.get('/:stock_id', [auth, validator(schemas.find, 'params'), check.stockId], report.find)
routes.post("/", [auth, validator(schemas.add)], report.add)
routes.put("/", [auth, validator(schemas.add)], report.update)

module.exports = routes;
