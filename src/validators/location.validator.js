const Joi = require('joi')

const schemas = {
    cities: Joi.object().keys({
        state_id: Joi.number().required()
    })
}
module.exports = schemas;
