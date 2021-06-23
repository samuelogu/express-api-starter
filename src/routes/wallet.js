const routes = require('express').Router();
const wallet = require('../controllers/wallet.controller')
const auth = require('../middlewares/auth')

const validator = require('../middlewares/validator')
const schemas = require('../validators/wallet.validator')

routes.get('/card', auth, wallet.getCards)
routes.post("/card", [auth, validator(schemas.addCard)], wallet.addCard)
routes.post("/", [auth, validator(schemas.fund)], wallet.fund)

module.exports = routes;
