const { Schema, Types, model } = require("mongoose");

const Episodes = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "free" },
    time: { type: String, required: true }
})

const ChapterSchema = new Schema.EventEmitter({
    title: { type: String, required: true },
    text: { type: String, default: "" },
    episodes: { type: [Episodes], default: [] }
})

const CourseSchema = new Schema({ 
    title : { type: String, required : true },
    short_text : { type: String, required : true },
    text : { type: String, required : true },
    image : { type: String, required : true },
    tags : { type: [String], default : [] },
    category : { type: Types.ObjectId, ref: "categories", required : true },
    comments : { type: [CommentSchema], default : [] },
    likes : { type: [Types.ObjectId],ref:'user', default : [] },
    dislikes : { type: [Types.ObjectId],ref:'user', default : [] },
    bookmarks : { type: [Types.ObjectId],ref:'user', default : [] },
    price : { type: Number, default : 0 },
    discount : { type: Number, default : 0 },
    type : { type: String, default: "free", required : true }, // free - cash - special
    time : { type: String, default: "00:00:00" },
    teacher : { type: Types.ObjectId, ref:"user", required : true },
    chapter: { type: [ChapterSchema], default: [] },
    students: { type: [ Types.ObjectId ], default: [], ref: "user" }
})

module.exports = {
    CourseModel: model("course", CourseSchema)
}