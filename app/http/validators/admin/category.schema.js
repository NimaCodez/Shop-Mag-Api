const joi = require('@hapi/joi');
const { MongoIDPattern } = require('../../../utils/constants');

const CreateCategoryValidation = joi.object({
    title: joi.string().required().min(2).max(30).error(new Error('Input title for category is incorrect')),
    parent: joi.string().allow('').pattern(MongoIDPattern).allow('').error(new Error('Sent ID is incorrect'))
})

module.exports = {
    CreateCategoryValidation
}
