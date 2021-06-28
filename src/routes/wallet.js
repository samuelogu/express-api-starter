const routes = require('express').Router();
const wallet = require('../controllers/wallet.controller')
const auth = require('../middlewares/auth')

const check = require('../middlewares/check')
const validator = require('../middlewares/validator')
const schemas = require('../validators/wallet.validator')

routes.get('/card', auth, wallet.getCards)
routes.post("/card", [auth, validator(schemas.addCard)], wallet.addCard)
routes.delete("/card/:card_id", [auth, check.cardId, validator(schemas.removeCard, 'params')], wallet.removeCard)
routes.post("/", [auth, check.authorizationCode, validator(schemas.fund)], wallet.fund)
routes.get("/", [auth], wallet.balance)
routes.get('/transactions', [auth], wallet.transactions)

module.exports = routes;
