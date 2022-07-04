const { CategoryController } = require("../../http/controllers/admin/category.controller");
const CategoryRouter = require("express").Router();

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Gets all the categories
 *          responses:
 *              201:
 *                  description: GET successfully
 */
 CategoryRouter.get("/all", CategoryController.GetAllCategories)

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Gets all the parent categories
 *          responses:
 *              201:
 *                  description: GET successfully
 */
CategoryRouter.get("/parents", CategoryController.GetAllParents)

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: Gets the child categories of a parent
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: GET success
 */
CategoryRouter.get("/children/:id", CategoryController.GetChildrenOfParents)

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

/**
* @swagger
*  /admin/category/edit/{id}:
*      patch:
 *          tags: [Admin-Panel]
 *          summary: Add a new category
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: false
 *              -   in: formData
 *                  name: parent
 *                  type: string
 *                  required: false
 *          responses:
 *              200:
 *                  description: EDITED Successfully
 */
CategoryRouter.patch("/edit/:id", CategoryController.EditCategory)

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-Panel]
 *          summary: Add a new category
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: deleted Successfully
 */
CategoryRouter.delete("/remove/:id", CategoryController.RemoveCategory)

module.exports = {
    CategoryRouter
}
