const { Schema, Types } = require("mongoose")

const CommentSchema = new Schema({
    user: { type: Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true},
    createdAt: { type: Date, default: Date.now()},
    parent: { type: Types.ObjectId, ref: "comment" },
    openToComment: { type: Boolean, required: true, default: true }
}, {
    timestamps: {
        createdAt: true
    }
})

module.exports = {
    CommentSchema,
}