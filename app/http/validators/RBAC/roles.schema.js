const { body, param } = require("express-validator");

function AddRoleValidationSchema() {
    return [
        body("title").isString().trim().not().isEmpty().withMessage("title Can't be empty").isLength({ min: 2, max: 15 }).withMessage("Role title must be between 2 to 15 Chars"),
        body("permissions").isArray().isLength({ min: 0, max: 7 }).withMessage("permissions to user can't be less than 1 and more than 7")
    ]
}

function UpdateRoleValidationSchema() {
    return [
        body("title").isString().trim().isLength({ min: 2, max: 15 }).withMessage(""),
        param("id").isMongoId().withMessage("Role Id is not correct"),
        body("permissions").isArray().isLength({ min: 0, max: 7 }).withMessage("permissions can be from 0 to 7 items")
    ]
}

module.exports = {
    AddRoleValidationSchema,
    UpdateRoleValidationSchema
}
