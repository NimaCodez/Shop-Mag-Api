const joi = require("@hapi/joi");

const AuthSchema = joi.object({
    mobile: joi.string().required().pattern(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/i)
    // email: joi.string().lowercase().required().trim().email().error(new Error('Invalid email address')),
    // password: joi.string().min(6).max(16).trim().required(),
})

module.exports = {
    AuthSchema
}