const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { JWT_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constants");
const createError = require("http-errors");

function GenerateRandomNumber() {
    return Math.floor((Math.random() * 10000) + 90000)
}

async function SignAccessToken(user) {

    const { mobile } = user;

    const options = {
        expiresIn: "1h"
    };

    return JWT.sign({mobile}, JWT_TOKEN_SECRET_KEY, options)

}

async function SignRefreshToken(userId) {

    const user = await UserModel.findById(userId)
    const mobile = user.mobile;

    const options = {
        expiresIn: "1y"
    };

    return JWT.sign({mobile}, REFRESH_TOKEN_SECRET_KEY, options)

}

module.exports = {
    GenerateRandomNumber,
    SignAccessToken,
    SignRefreshToken,
}
