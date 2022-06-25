const { Schema, Types, model } = require("mongoose");

const BlogSchema = new Schema({ 
    author: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId, ref: "category", required: true },
    comments : { type : [CommentSchema], default : [] },
    likes : { type : [Types.ObjectId], ref: "user", default : [] },
    dislikes : { type : [Types.ObjectId], ref: "user", default : [] },
    bookmarks : { type : [Types.ObjectId], ref: "user", default : [] }
}, {
    timestamps: true,
});

module.exports = {
    BlogModel: model("Blog", BlogSchema)
}
