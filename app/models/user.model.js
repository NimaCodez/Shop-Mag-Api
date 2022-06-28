const { Schema, Types, model } = require("mongoose");

const UserSchema = new Schema({ 
    first_name : { type : String },
    last_name : { type : String },
    username : { type : String, lowercase : true },
    mobile : { type : String, required : true },
    email : { type : String, lowercase : true },
    password : { type : String },
    otp : { type : Object, default : {
        code : 0,
        expiresIn : 0
    }},
    bills : { type : [], default : [] },
    discount : { type : Number, default : 0 },
    birthday : { type : String },
    Role : { type : [String], default : "USER" },
}, {
    timestamps: true,
})

module.exports = {
    UserModel: model("user", UserSchema)
}