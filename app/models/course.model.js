const { Schema, Types, model } = require("mongoose");
const { GetVideosTotalTime } = require("../utils/functions");
const { CommentSchema } = require("./public.schema");

const Episodes = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "unlock" },
    time: { type: String, required: true },
    videoAddress: { type: String, required: true }
}, {
    toJSON: {
        virtuals: true
    }
})

Episodes.virtual("VideoURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APP_PORT}/${this.videoAddress}`
})

const ChapterSchema = new Schema({
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
    status: { type: String, default: "Not Started" }, // Not started , Completed, Holdin
    teacher : { type: Types.ObjectId, ref:"user", required : true },
    chapters: { type: [ChapterSchema], default: [] },
    students: { type: [ Types.ObjectId ], default: [], ref: "user" }
}, {
    toJSON: {
        virtuals: true
    }
})

CourseSchema.index({ title: "text", short_text: "text", text: "text" })

CourseSchema.virtual("imgURL").get(function() {
    return `${process.env.BASE_URL}:${process.env.APP_PORT}/${this.image}`
})

CourseSchema.virtual("TotalTime").get(function() {
    return GetVideosTotalTime(this.chapters)
})

module.exports = {
    CourseModel: model("course", CourseSchema)
}