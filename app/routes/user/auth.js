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
 *  /user/login:
 *      post:
 *          summary: index of routes 
 *          tags: [AuthRoutes]
 *          description : Generate Otp for mobiles
 *          parameters:
 *              -   in: formData
 *                  name: mobile
 *                  example: 09304175210
 *          responses:
 *              200:
 *                  description: success
 *                  schema: 
 *                      type: string
 *                      example : Index Page Store
 *              404: 
 *                  description: not Found
 */
AuthRouter.post("/login", UserAuthController.Login)

module.exports = {
    AuthRouter
}