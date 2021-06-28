const Joi = require('joi')

const schemas = {
    addCard: Joi.object().keys({
        cvv: Joi.string().min(3).required(),
        number: Joi.string().min(13).required(),
        expiry_date: Joi.date().required(),
        pin: Joi.string().min(3).required(),
    }),
    fund: Joi.object().keys({
        amount: Joi.number().required(),
        authorization_code: Joi.string().required()
    }),
    removeCard: Joi.object().keys({
        card_id: Joi.number().required(),
    })
}
module.exports = schemas;
