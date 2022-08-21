const { CategoryController } = require("../../http/controllers/admin/category.controller");
const { verifyAccessToken, CheckRole } = require("../../http/middlewares/verifyAccessToken");
const CategoryRouter = require("express").Router();

CategoryRouter.post("/add", PermissionGuard([PERMISSIONS.CONTENT_MANAGER]), CategoryController.AddCategory)

CategoryRouter.patch("/edit/:id", PermissionGuard([PERMISSIONS.CONTENT_MANAGER]), CategoryController.EditCategory)

CategoryRouter.delete("/remove/:id", PermissionGuard([PERMISSIONS.CONTENT_MANAGER]), CategoryController.RemoveCategory)

CategoryRouter.get("/all", PermissionGuard([]), CategoryController.GetAllCategories)

CategoryRouter.get("/list-of-all", PermissionGuard([]), CategoryController.GetAllCategoriesWithoutPopulate)

CategoryRouter.get("/parents", PermissionGuard([PERMISSIONS.CONTENT_MANAGER]), CategoryController.GetAllParents)

CategoryRouter.get("/children/:id", PermissionGuard([PERMISSIONS.CONTENT_MANAGER]), CategoryController.GetChildrenOfParents)

CategoryRouter.get("/:id", PermissionGuard([]), CategoryController.GetCategoryById)

module.exports = {
    AdminCategoryRouter : CategoryRouter
}
