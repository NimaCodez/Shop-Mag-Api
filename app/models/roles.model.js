const { default: mongoose, Schema, model } = require("mongoose");

const RoleSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    permissions: { type: [mongoose.Types.ObjectId], ref: "permissions", default: [] }
}, {
    toJSON: {
        virtuals: true
    }
})

module.exports = {
    RoleModel : model("roles", RoleSchema)
}
