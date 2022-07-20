const { Schema, Types, model } = require("mongoose");
const { CommentSchema } = require("./public.schema");
const ProductSchema = new Schema({ 
    title : { type: String, required : true },
    short_text : { type: String, required : true },
    text : { type: String, required : true },
    images : { type: [String], required : true },
    tags : { type: [String], default : [] },
    category : { type: Types.ObjectId, ref: "categories", required : true },
    comments : { type: [CommentSchema], default : [] },
    likes : { type: [Types.ObjectId],ref:'user', default : [] },
    dislikes : { type: [Types.ObjectId],ref:'user', default : [] },
    bookmarks : { type: [Types.ObjectId],ref:'user', default : [] },
    price : { type: Number, default : 0 },
    discount : { type: Number, default : 0 },
    count : { type: Number },
    type : { type: String, required : true }, 
    format : { type: String },
    supplier : { type: Types.ObjectId, ref:"user", required : true },
    features : { type: Object, default : {
        length : "",
        height : "",
        width : "",
        weight : "",
        colors : [],
        madein : ""
    }},
})

module.exports = {
    ProductModel: model("product", ProductSchema)
}