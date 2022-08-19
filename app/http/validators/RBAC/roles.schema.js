const { body, param } = require("express-validator");

function AddRoleValidationSchema() {
    return [
        body("title").isString().trim().not().isEmpty().withMessage("title Can't be empty").isLength({ min: 2, max: 15 }).withMessage("Role title must be between 2 to 15 Chars"),
        body("description").isString().trim().not().isEmpty().withMessage("Role description must not be empty!").isLength({ min: 2, max: 30 }).withMessage("Role's desciprion can't be less than 2 and more than 30"),
        body("permission").isArray().isLength({ min: 0, max: 8 }).withMessage("permissions to user can't be less than 1 and more than 7")
    ]
}

function UpdateRoleValidationSchema() {
    return [
        body("title").optional().isString().trim().isLength({ min: 2, max: 15 }).withMessage(""),
        body("description").optional().isString().trim().not().isEmpty().withMessage("Role description must not be empty!").isLength({ min: 2, max: 30 }).withMessage("Role's desciprion can't be less than 2 and more than 30"),
        body("permission").optional().isArray().isLength({ min: 0, max: 7 }).withMessage("permissions can be from 0 to 7 items")
    ]
}

module.exports = {
    AddRoleValidationSchema,
    UpdateRoleValidationSchema
}
