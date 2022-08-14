const joi = require('@hapi/joi');
const { param } = require('express-validator');
const createHttpError = require('http-errors');
const { MongoIDPattern } = require('../../utils/constants');

const MongoIdValidator = joi.object({
    id: joi.string().regex(MongoIDPattern).error(new Error("MongoId is not correct"))
})

function MongoDbObjectIdValidator() {
    return [
        param("id").isMongoId().withMessage("MongoDb Id is incorrect!")
    ]
}

module.exports = {
    MongoIdValidator,
    MongoDbObjectIdValidator
}