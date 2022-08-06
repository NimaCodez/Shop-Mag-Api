const Joi = require("@hapi/joi");
const { MongoIDPattern } = require("../../../utils/constants");
const createError = require("http-errors");

const CreateBlogSchema = Joi.object({
    title : Joi.string().required().min(3).max(120).error(createError.BadRequest("Blog title is not correct 🥲 ")),
    text: Joi.string().error(createError.BadRequest("Sent text is not correct 🥲 ")),
    short_text: Joi.string().error(createError.BadRequest("Sent text is not correct 🥲 ")),
    fileName: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("File type is not correct 🗿 send .png/.jpg/.jpeg/.webp/.gif")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("Tags cant be less than 1 and more than 20")),
    category: Joi.string().pattern(MongoIDPattern).error(createError.BadRequest("Sent Id is not correct")),
    fileUploadPath : Joi.allow()
})

module.exports = {
    CreateBlogSchema,
}
