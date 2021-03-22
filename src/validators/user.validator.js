const Joi = require('joi')

const schemas = {
    register: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}
module.exports = schemas;
