const { default: mongoose, Schema, model, model } = require("mongoose");

const PermissionSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, default: "" }
}, {
    toJSON: {
        virtuals: true
    }
})

module.exports = {
    PermissionModel : model("permissions", PermissionSchema)
}
