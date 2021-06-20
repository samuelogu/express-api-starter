const Joi = require('joi')

const schemas = {
    add: Joi.object().keys({
        stockId: Joi.number().required(),
        daily_mortality: Joi.number(),
        feed_cost: Joi.number().required(),
        fcr: Joi.number().required(),
        body_weight_fed: Joi.number().required(),
        month: Joi.number(),
        day: Joi.number(),
        feeding_day: Joi.number(),
        feed_brand: Joi.string(),
        feeding_period: Joi.string()
    }),
    find: Joi.object().keys({
        stock_id: Joi.number()
    })
}
module.exports = schemas;
