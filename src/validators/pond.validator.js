const Joi = require('joi')

const schemas = {
    add: Joi.object().keys({
        name: Joi.string().required(),
        number: Joi.number().required(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        depth: Joi.number().required(),
        description: Joi.string()
    }),
    find: Joi.object().keys({
        id: Joi.number().required()
    }),
    update: Joi.object().keys({
        name: Joi.string().required(),
        number: Joi.number().required(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        depth: Joi.number().required(),
        description: Joi.string(),
        id: Joi.number()
    })
}
module.exports = schemas;
