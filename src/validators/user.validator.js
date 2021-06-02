const Joi = require('joi')

const schemas = {
    register: Joi.object().keys({
        name: Joi.string().required(),
        phone: Joi.number().required(),
        gender: Joi.string().required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(6).required()
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
}
module.exports = schemas;
