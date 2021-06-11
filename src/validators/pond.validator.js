const Joi = require('joi')

const schemas = {
    add: Joi.object().keys({
        name: Joi.string().required(),
        number: Joi.number().required(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        depth: Joi.number().required(),
        description: Joi.string()
    })
}
module.exports = schemas;
