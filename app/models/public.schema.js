const { Schema, Types } = require("mongoose")

const AnswerSchema = new Schema({
    user: { type: Types.ObjectId, required: true, ref: "user" },
    comment: { type: String, required: true },
    show: { type: Boolean, required: true, default: false }
}, {
    timestamps: {
        createdAt: true
    }
})

const CommentSchema = new Schema({
    user: { type: Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true},
    createdAt: { type: Date, default: Date.now()},
    answers: { type: [AnswerSchema], default: [] },
    openToComment: { type: Boolean, required: true, default: true }
}, {
    timestamps: {
        createdAt: true
    }
})

module.exports = {
    CommentSchema,
}