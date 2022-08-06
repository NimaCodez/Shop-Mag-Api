const joi = require("@hapi/joi");

const GetOtpSchema = joi.object({
    mobile: joi.string().required().pattern(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/i)
})

const CheckOtpSchema = joi.object({
    // mobile: joi.string().required().pattern(/(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/i).error(new Error("Phone Number is not valid")),
    mobile: joi.allow(""),
    code: joi.string().required().min(4).max(6).error(new Error("Code is Not Valid"))
})

module.exports = {
    GetOtpSchema,
    CheckOtpSchema
}