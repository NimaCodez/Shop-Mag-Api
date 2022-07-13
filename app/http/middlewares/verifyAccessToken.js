const JWT = require('jsonwebtoken');
const { JWT_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('../../utils/constants');
const createError = require("http-errors");
const { UserModel } = require('../../models/user.model');
const redisClient = require('../../utils/init_redis');

const verifyAccessToken = (req, res, next) => {
    const headers = req.headers;
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];

    if (token && ["Bearer", "bearer"].includes(bearer)) {

        JWT.verify(token, JWT_TOKEN_SECRET_KEY, async (err, payload) => {

            if (err) return next(createError.Unauthorized("Please Log in to your account! 🐢"));

            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });

            if (!user) return next(createError.Unauthorized("No Account Was found! 🐢"));
            req.user = user;

            return next();

        })

    }

    else return next(createError.Unauthorized("Please Log in to your account! 🐢"));
}

const verifyRefreshToken = (token) => {

    return new Promise((resolve, reject) => {

        JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
    
            if (err) reject(createError.Unauthorized("Please Log in to your account! 🐢"));
    
            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
    
            if (!user) reject(createError.Unauthorized("No Account Was found! 🐢"));

            // const refreshToken = await redisClient.get(String(user._id));
            if(token === refreshToken) resolve(mobile)

            reject(createError.Unauthorized("Force Login to account was not done"));
        })

    })

}

module.exports = {
    verifyAccessToken,
    verifyRefreshToken
}
