const path = require("path");
const fs = require("fs");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { JWT_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constants");
const createError = require("http-errors");
const redisClient = require("./init_redis");
const { allowedNodeEnvironmentFlags } = require("process");

function GenerateRandomNumber() {
    return Math.floor(Math.random()*90000) + 10000;
}

async function SignAccessToken(user) {

    const { mobile } = user;

    const options = {
        expiresIn: "1h"
    };

    return JWT.sign({mobile}, JWT_TOKEN_SECRET_KEY, options)

}

async function SignRefreshToken(userId) {

    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const mobile = user.mobile;
    
        const options = {
            expiresIn: "1y"
        };
    
        JWT.sign({mobile}, REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
            if (err) reject(createError.InternalServerError("Internal Server Error"))
            // await redisClient.set(String(userId), token, {EX: 31536000}, (err) => {
            //     if (err) reject(console.log(err));
            // })
            resolve(token);
        })
    })

}

function ListOfImagesFromRequest(files, fileUploadPath) {
    if(files?.length) {
        return (files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/gi, "/"))
    }
    else {
        return []
    }
}

function DeleteFileInPublic(FileAddress) {
    if (FileAddress) {
        const FilePath = path.join(__dirname, "..", "..", "public", FileAddress)
        if(fs.existsSync(FilePath)) fs.unlinkSync(FilePath);
    }
}

module.exports = {
    GenerateRandomNumber,
    SignAccessToken,
    SignRefreshToken,
    DeleteFileInPublic,
    ListOfImagesFromRequest
}
