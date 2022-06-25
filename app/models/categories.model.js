const { Schema, Types, model } = require("mongoose");

const CategorySchema = new Schema({ 
    title : { type : String, required : true },
    parent : { type : Types.ObjectId, ref: "category", default : undefined }
})

module.exports = {
    CategoryModel: model("model", CategorySchema)
}