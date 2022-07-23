const { CategoryController } = require("../../http/controllers/admin/category.controller");
const { verifyAccessToken, CheckRole } = require("../../http/middlewares/verifyAccessToken");
const CategoryRouter = require("express").Router();

CategoryRouter.post("/add", CategoryController.AddCategory)

CategoryRouter.patch("/edit/:id", CategoryController.EditCategory)

CategoryRouter.delete("/remove/:id", CategoryController.RemoveCategory)

CategoryRouter.get("/all", CategoryController.GetAllCategories)

CategoryRouter.get("/list-of-all", CategoryController.GetAllCategoriesWithoutPopulate)

CategoryRouter.get("/parents", CategoryController.GetAllParents)

CategoryRouter.get("/children/:id", CategoryController.GetChildrenOfParents)

CategoryRouter.get("/:id", CategoryController.GetCategoryById)

module.exports = {
    AdminCategoryRouter : CategoryRouter
}
