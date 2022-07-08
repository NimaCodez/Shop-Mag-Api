const { CategoryController } = require("../../http/controllers/admin/category.controller");
const CategoryRouter = require("express").Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(Admin-Panel)]
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
 *          tags: [Category(Admin-Panel)]
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
 *          tags: [Category(Admin-Panel)]
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

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: Gets all the categories
 *          responses:
 *              201:
 *                  description: GET successfully
 */
CategoryRouter.get("/all", CategoryController.GetAllCategories)

/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: Get List of categories
 *          responses:
 *              200:
 *                  description: GET Success
 */
CategoryRouter.get("/list-of-all", CategoryController.GetAllCategoriesWithoutPopulate)

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Category(Admin-Panel)]
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
 *          tags: [Category(Admin-Panel)]
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
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: Gets category by Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: GET success
 */
CategoryRouter.get("/:id", CategoryController.GetCategoryById)

module.exports = {
    CategoryRouter
}
