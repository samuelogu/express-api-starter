const routes = require('express').Router();
const pond = require('../controllers/pond.controller')
const auth = require('../middlewares/auth')
const check = require('../middlewares/check')

const validator = require('../middlewares/validator')
const schemas = require('../validators/pond.validator')

routes.get('/', auth, pond.find)
routes.post("/", [auth, validator(schemas.add)], pond.add)
routes.put("/:id", [auth, check.pondId, validator(schemas.update)], pond.update)

module.exports = routes;
