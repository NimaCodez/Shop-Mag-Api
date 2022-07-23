const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller");

const AuthRouter = require("express").Router();

AuthRouter.post("/getotp", UserAuthController.GetOtp)

AuthRouter.post("/check-otp", UserAuthController.CheckOtp)

AuthRouter.post("/refresh-token", UserAuthController.refreshToken)

module.exports = {
    AuthRouter
}