const { Schema, Types, model } = require("mongoose");

const CommentSchema = new Schema({
    user: { type: Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true},
    createdAt: { type: Date, default: Date.now()},
    parent: { type: Types.ObjectId }
})

const BlogSchema = new Schema({ 
    author: { type: Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String },
    tags: { type: [String], default: [] },
    category: { type: [Types.ObjectId], ref: "categories",  required: true },
    comments : { type : [CommentSchema], default : [] },
    likes : { type : [Types.ObjectId], ref: "user", default : [] },
    dislikes : { type : [Types.ObjectId], ref: "user", default : [] },
    bookmarks : { type : [Types.ObjectId], ref: "user", default : [] }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

BlogSchema.virtual("user", {
    ref : "user",
    localField : "_id",
    foreignField: "author"
})
BlogSchema.virtual("category_detail", {
    ref : "categories",
    localField : "_id",
    foreignField: "category"
})

module.exports = {
    BlogModel: model("Blog", BlogSchema)
}
