const joi = require('@hapi/joi');
const createHttpError = require('http-errors');
const { MongoIDPattern } = require('../../utils/constants');

const MongoIdValidator = joi.object({
    id: joi.string().regex(MongoIDPattern)
})
module.exports = {
    MongoIdValidator
}