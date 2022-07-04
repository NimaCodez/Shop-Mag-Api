const joi = require('@hapi/joi');
const { MongoIDPattern } = require('../../utils/constants');

const MongoIdValidator = joi.object({
    id: joi.string().pattern(MongoIDPattern).error(new Error('Invalid Id'))
})

module.exports = {
    MongoIdValidator
}