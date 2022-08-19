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

// RoleSchema.virtual("permission", {
//     ref : "permissions",
//     localField : permissio,
//     foreignField: "author"
// })

module.exports = {
    RoleModel : model("roles", RoleSchema)
}
