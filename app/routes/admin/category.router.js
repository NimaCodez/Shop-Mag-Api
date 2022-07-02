const { CategoryController } = require("../../http/controllers/admin/category.controller");
const CategoryRouter = require("express").Router();
/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
 *          summary: Add a new category
 *          parameters:
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: parent
 *                  type: string
 *                  required: false
 *          responses:
 *              201:
 *                  description: Created Successfully
 */
CategoryRouter.post("/add", CategoryController.AddCategory)

module.exports = {
    CategoryRouter
}
