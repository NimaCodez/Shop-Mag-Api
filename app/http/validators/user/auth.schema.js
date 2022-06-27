const joi = require("@hapi/joi");
const AuthSchema = joi.object({
    email: joi.string().lowercase().required().trim().email(),
    password: joi.string().min(6).max(16).trim().required(),
})

module.exports {
    AuthSchema
}