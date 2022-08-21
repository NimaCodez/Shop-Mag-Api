const JWT = require('jsonwebtoken');
const { JWT_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('../../utils/constants');
const createError = require("http-errors");
const { UserModel } = require('../../models/user.model');
const redisClient = require('../../utils/init_redis');

async function GetToken (headers) {
    const token = await headers?.authorization?.split(" ")[1] || [];
    if (token) return token;
    throw createError.Unauthorized("please Login first! 🐢 ")
}

async function verifyAccessToken(req, res, next) {
    try {
        const token = await GetToken(req.headers).then(token => token);
        JWT.verify(token, JWT_TOKEN_SECRET_KEY, async (err, payload) => {
            try {
                if (err) throw createError.Unauthorized("Login to your account! 🐢");
                const { mobile } = payload || {};
                const user = await UserModel.findOne(
                    { mobile },
                    { password: 0, otp: 0 }
                );
                if (!user) throw createError.Unauthorized("Account was not found! 🐢");
                req.user = user;
                return next();
            } catch (error) {
                next(error);
            }
        })
    } catch (error) {
        next(error);
    }
}

const verifyRefreshToken = (token) => {

    return new Promise((resolve, reject) => {

        JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {

            if (err) reject(createError.Unauthorized("Please Log in to your account! 🐢"));

            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });

            if (!user) reject(createError.Unauthorized("No Account Was found! 🐢"));

            const refreshToken = await redisClient.get(String(user._id));
            if (token === refreshToken) resolve(mobile)

            reject(createError.Unauthorized("Force Login to account was not done"));
        })

    })

}

module.exports = {
    verifyAccessToken,
    verifyRefreshToken,
}
