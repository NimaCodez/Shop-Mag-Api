const { Schema, model } = require("mongoose");

const PermissionSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, default: "" }
}, {
    toJSON: {
        virtuals: true
    }
})

PermissionSchema.index({ title: "text" })

PermissionSchema.virtual("permission").get(function() {
    return this.title;
})

module.exports = {
    PermissionModel : model("permissions", PermissionSchema)
}
