
const { HomeController } = require("../../http/controllers/api/home.controller");
const { verifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const IndexRouter = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description : index page route and dat
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes 
 *      tags: [IndexPage]
 *      description : get all need data for index page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer YourToken...
 *      responses:
 *          200:
 *              description: success
 *              schema: 
 *                  type: string
 *                  example : Index Page Store
 *          404: 
 *              description: not Found
 */
IndexRouter.get("/", verifyAccessToken, HomeController.indexPage);
module.exports = {
    IndexRouter
}