const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constants");

const CreateCourseSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("Course title is not correct")),
    text: Joi.string().error(createError.BadRequest("Course text is not correct")),
    short_text: Joi.string().error(createError.BadRequest("Course short description is not correct")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("Tags can't be more than 20")),
    category: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("Category Id is incorrect")),
    price: Joi.number().error(createError.BadRequest("Course price is not correct")),
    discount: Joi.number().error(createError.BadRequest("Discount is not correct")),
    type: Joi.string().regex(/(free|cash|special)/i),
    fileName: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("Image format is not correct")),
    fileUploadPath : Joi.allow()
});

const CreateEpisodeSchema = Joi.object({
    title : Joi.string().required().error(createError.BadRequest("Episode title can'be lass than 3 and more than 30 charecters.")),
    text: Joi.string().error(createError.BadRequest("Sent text is not corect")),
    type: Joi.string().regex(/(lock|unlock|)/i),
    chapterID: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("Chapter id is not correct")),
    courseID: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("Course Id is not corect")),
    fileName: Joi.string().regex(/(\.mp4|\.mkv|\.mov|\.avi|\.)$/).error(createError.BadRequest("Image format is not correct")),
    fileUploadPath : Joi.allow()
});

module.exports = {
    CreateCourseSchema,
    CreateEpisodeSchema
}
