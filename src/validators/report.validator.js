const Joi = require('joi')

const schemas = {
    add: Joi.object().keys({
        stockId: Joi.number().required(),
        daily_mortality: Joi.number().required(),
        feed_cost: Joi.number().required(),
        fcr: Joi.number().required(),
        body_weight_fed: Joi.date().required(),
        stocking_month: Joi.date().required()
    })
}
module.exports = schemas;
