const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constants");

const CreateProductSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("Product title is not correct!")),
    text: Joi.string().error(createError.BadRequest("Text is not correct")),
    short_text: Joi.string().error(createError.BadRequest("Short text is not correct")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("Tags can't be more than 20! ")),
    category: Joi.string().regex(MongoIDPattern).error(createError.BadRequest("Category was npt found")),
    price: Joi.number().error(createError.BadRequest("Price is not correct")),
    discount: Joi.number().error(createError.BadRequest("Discount is wrong! ")),
    count: Joi.number().error(createError.BadRequest("Prodict count is not correct")),
    weight: Joi.number().allow(null, 0, "0").error(createError.BadRequest("Input weight is wrong! ")),
    length: Joi.number().allow(null, 0, "0").error(createError.BadRequest("Input length is wrong! ")),
    height: Joi.number().allow(null, 0, "0").error(createError.BadRequest("Input height is wrong! ")),
    width: Joi.number().allow(null, 0, "0").error(createError.BadRequest("Input width is wrong! ")),
    type: Joi.string().regex(/(virtual|physical)/i),
    fileName: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("File fromat is not supported")),
    // colors: Joi.array().min(0).max(20).error(createError.BadRequest("Selected colors can't be more than 20")),
    fileUploadPath : Joi.allow()
});

module.exports = {
    CreateProductSchema
}