const { ProductController } = require("../../http/controllers/admin/product.controller");
const { PermissionGuard } = require("../../http/middlewares/Permission.guard");
const { StringToArray } = require("../../http/middlewares/StringToArray");
const { PERMISSIONS } = require("../../utils/constants");
const { UploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post("/add", PermissionGuard([PERMISSIONS.SUPPLIER, PERMISSIONS.CONTENT_MANAGER]), UploadFile.array("images", 10), StringToArray("tags"), ProductController.AddProduct)

router.patch("/edit/:id", PermissionGuard([PERMISSIONS.SUPPLIER, PERMISSIONS.CONTENT_MANAGER]),  UploadFile.array("images"), StringToArray("tags", "colors"), ProductController.EditProduct)

router.delete("/remove/:id", PermissionGuard([PERMISSIONS.SUPPLIER, PERMISSIONS.CONTENT_MANAGER], ProductController.RemoveProduct))

router.get("/", PermissionGuard([]), ProductController.GetAllProducts)

router.get("/:id", PermissionGuard([]), ProductController.GetProductById)

module.exports = {
    AdminProductsRouter: router
}
