const { ProductController } = require("../../http/controllers/admin/product.controller");
const { StringToArray } = require("../../http/middlewares/StringToArray");
const { UploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post("/add", UploadFile.array("images", 10), StringToArray("tags"), ProductController.AddProduct)

router.patch("/edit/:id", UploadFile.array("images"), StringToArray("tags", "colors"), ProductController.EditProduct)

router.delete("/remove/:id", ProductController.RemoveProduct)

router.get("/", ProductController.GetAllProducts)

router.get("/:id", ProductController.GetProductById)

module.exports = {
    AdminProductsRouter : router
}
