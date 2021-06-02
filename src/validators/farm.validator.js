const Joi = require('joi')

const schemas = {
    add: Joi.object().keys({
        name: Joi.string().required(),
        city_id: Joi.number().required(),
        location: Joi.string().required()
    })
}
module.exports = schemas;
