const { validationResult } = require("express-validator")

const validationErrorMapper = (req, res, next) => {
    messages = {}
    const result = validationResult(req)
    if(result?.errors?.length > 0) {
        result?.errors.forEach(err => {
            messages[err.param] = err.msg;
        })
        return res.status(400).json({
            status: 400,
            success: false, 
            messages
        })
    }
    next()
}

module.exports = {
    validationErrorMapper,
}
