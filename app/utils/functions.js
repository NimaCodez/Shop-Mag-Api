const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { SECRET_KEY } = require("./constants");
const createError = require("http-errors");

function GenerateRandomNumber() {
    return Math.floor((Math.random() * 10000) + 90000)
}

async function SignAccessToken(user) {

    // const user = await UserModel.findOne({ _id: userId });

    const payload = {
        mobile: user.mobile,
        userID: user._id
    };

    const options = {
        expiresIn: "1h"
    };

    return JWT.sign(payload, SECRET_KEY, options)

}

module.exports = {
    GenerateRandomNumber,
    SignAccessToken,
}
