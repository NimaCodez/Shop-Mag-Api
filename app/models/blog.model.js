const { Schema, Types, model } = require("mongoose");
const { CommentSchema } = require("./public.schema");

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

BlogSchema.virtual("VideoURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APP_PORT}/${this.image}`
})

module.exports = {
    BlogModel: model("Blog", BlogSchema)
}
