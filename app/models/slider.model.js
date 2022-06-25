const { Schema, Types, model } = require("mongoose");

const SliderSchema = new Schema({ 
    text: { type: String, default: "", },
    title: { type: String, default: "" },
    image: { type: String, required: true, },
    type: { type: String, default: "base" }
})

module.exports = {
    SliderModel: model("SliderModel", SliderSchema)
}