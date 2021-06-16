const Joi = require('joi')

const schemas = {
    add: Joi.object().keys({
        pondId: Joi.number().required(),
        weight: Joi.number().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        stocking_date: Joi.date().required(),
        stocking_month: Joi.date().required()
    })
}
module.exports = schemas;
