const { body } = require("express-validator");
const createHttpError = require("http-errors");

function AddPermissionValidator() {
    return [
        body("title").isString().isLength({ min: 1, max: 5}).withMessage(createHttpError.BadRequest("Permission must be from 1 to 5 Chars")),
        body("description").optional().isString().isLength({ min: 2, max: 50 }).withMessage(createHttpError.BadRequest("Description must be from 2 to 50 Chars"))
    ]
}

module.exports = {
    AddPermissionValidator,
}
