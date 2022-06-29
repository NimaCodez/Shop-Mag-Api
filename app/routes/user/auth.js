const { UserAuthController } = require("../../http/controllers/user/auth/auth.controller");

const AuthRouter = require("express").Router();

/**
 * @swagger
 *  tags: 
 *      name: AuthRoutes
 *      description: User Auth Routes
 */
/**
 * @swagger
 *  /user/getotp:
 *      post:
 *          summary: Generates Otp For User 
 *          tags: [AuthRoutes]
 *          description : Generate Otp for mobiles
 *          parameters:
 *              -   in: formData
 *                  name: mobile
 *                  example: 09304175210
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 *              404: 
 *                  description: not Found
 */
AuthRouter.post("/getotp", UserAuthController.GetOtp)
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          summary: Otp Checking route
 *          tags: [AuthRoutes]
 *          description: Checks User's Otp Code and Phone Number
 *          parameters:
 *              -   in: formData
 *                  name: mobile
 *                  description: fa-IRI phone number
 *                  example: 09304175210
 *                  required: true
 *                  type: string
 * 
 *              -   name: code
 *                  example: 33412
 *                  description: Code which is sms'ed
 *                  required: true
 *                  type: string
 *                  in: formData
 *          responses:
 *              200:
 *                  description: OK
 *              400:
 *                  description: Bad Request
 *              404:
 *                  description: Not found
 *              401: 
 *                  description: UnAuthorized
 *              500:
 *                  description: Internal Server Error
 */
AuthRouter.post("/check-otp", UserAuthController.CheckOtp)
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          summary: Refresh Token for user
 *          tags: [AuthRoutes]
 *          description: Refresh token generator for user to do Payment and ...
 *          parameters:
 *              -   in: formData
 *                  name: refreshToken
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                  description: OK
 *              400:
 *                  description: Bad Request
 *              404:
 *                  description: Not found
 *              401: 
 *                  description: UnAuthorized
 *              500:
 *                  description: Internal Server Error
 */
AuthRouter.post("/refresh-token", UserAuthController.refreshToken)

module.exports = {
    AuthRouter
}