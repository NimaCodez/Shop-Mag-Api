const path = require("path");
const fs = require("fs");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { JWT_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constants");
const createError = require("http-errors");
const redisClient = require("./init_redis");
const { allowedNodeEnvironmentFlags } = require("process");

function GenerateRandomNumber() {
    return Math.floor(Math.random() * 90000) + 10000;
}

async function SignAccessToken(user) {

    const { mobile } = user;

    const options = {
        expiresIn: "7h"
    };

    return JWT.sign({ mobile }, JWT_TOKEN_SECRET_KEY, options)

}

async function SignRefreshToken(userId) {

    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const mobile = user.mobile;

        const options = {
            expiresIn: "1y"
        };

        JWT.sign({ mobile }, REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
            if (err) reject(createError.InternalServerError("Internal Server Error"))
            // await redisClient.set(String(userId), token, {EX: 31536000}, (err) => {
            //     if (err) reject(console.log(err));
            // })
            resolve(token);
        })
    })

}

function ListOfImagesFromRequest(files, fileUploadPath) {
    if (files?.length > 0) {
        return (files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/gi, "/"))
    }
    else {
        return []
    }
}

function getTime(seconds) {
    let total = Math.round(seconds) / 60;
    let [minutes, percent] = String(total).split(".");
    let second = Math.round((percent * 60) / 100).toString().substring(0, 2);
    let houre = 0;
    if (minutes > 60) {
        total = minutes / 60
        let [h1, percent] = String(total).split(".");
        houre = h1,
            minutes = Math.round((percent * 60) / 100).toString().substring(0, 2);
    }
    return (houre + ":" + minutes + ":" + second)
}

function DeleteFileInPublic(FileAddress) {
    if (FileAddress) {
        const FilePath = path.join(__dirname, "..", "..", "public", FileAddress)
        if (fs.existsSync(FilePath)) fs.unlinkSync(FilePath);
    }
}

function CopyObject(object) {
    return JSON.parse(JSON.stringify(object))
}

function SetFeatures(body) {
    const { colors, width, height, length, weight } = body;
    let features = {}
    if (!isNaN(+width) || !isNaN(+height) || !isNaN(+length) || !isNaN(+weight)) {
        features.colors = colors;
        if (!width) features.width = 0;
        else features.width = +width;
        if (!height) features.height = 0;
        else features.height = +height;
        if (!length) features.length = 0;
        else features.length = +length;
        if (!weight) features.weight = 0;
        else features.weight = +weight;
    }
    return features;
}

function DeleteInvalidPropertyInObject(data = {}, blackListFields = []) {
    let nullishData = ["", " ", "0", 0, null, undefined]
    Object.keys(data).forEach(key => {
        if (blackListFields.includes(key)) delete data[key]
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
        if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
        if (nullishData.includes(data[key])) delete data[key];
    })
}

module.exports = {
    GenerateRandomNumber,
    SignAccessToken,
    SignRefreshToken,
    DeleteFileInPublic,
    ListOfImagesFromRequest,
    CopyObject,
    SetFeatures,
    DeleteInvalidPropertyInObject,
    getTime,
}
