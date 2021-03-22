const createError = require('http-errors')

const middleware = (schema, property) => {
    return (req, res, next) => {
        const options = {
            errors: {
                wrap: {
                    label: ''
                }
            }
        }
        const { error } = schema.validate(req.body, options);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            next(createError.UnprocessableEntity(message))

        }
    }
}

module.exports = middleware;
