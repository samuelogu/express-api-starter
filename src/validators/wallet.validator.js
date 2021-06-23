const Joi = require('joi')

const schemas = {
    addCard: Joi.object().keys({
        cvv: Joi.number().min(3).max(4).required(),
        number: Joi.number().min(13).max(19).required(),
        expiry_date: Joi.date().required(),
        pin: Joi.number().min(3).max(4).required(),
    }),
    fund: Joi.object().keys({
        amount: Joi.number().required(),
        authorization_code: Joi.string().required()
    })
}
module.exports = schemas;
