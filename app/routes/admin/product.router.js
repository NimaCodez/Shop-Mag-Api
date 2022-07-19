const { ProductController } = require("../../http/controllers/admin/product.controller");
const { StringToArray } = require("../../http/middlewares/StringToArray");
const { UploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   image
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Product title
 *                  short_tex:
 *                      type: string
 *                      description: Product title
 *                  text:
 *                      type: string
 *                      description: Product title
 *                  tags:
 *                      type: array
 *                      description: Product title
 *                  category:
 *                      type: string
 *                      description: Product title
 *                  price:
 *                      type: string
 *                      description: Product title
 *                  discount:
 *                      type: string
 *                      description: Product title
 *                  count:
 *                      type: string
 *                      description: Product title
 *                  width:
 *                      type: string
 *                      description: Product title
 *                  height:
 *                      type: string
 *                      description: Product title
 *                  length:
 *                      type: string
 *                      description: Product title
 *                  weight:
 *                      type: string
 *                      description: Product title
 *                  image:
 *                      type: file
 *                      description: Product title
 */

 /**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Product(Admin-Panel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: created new Product
 */
router.post("/add", UploadFile.single("image"), StringToArray("tags"), ProductController.AddProduct)
router.patch("/edit/:id", ProductController.EditProduct)
router.delete("/remove/:id", ProductController.RemoveProduct)
router.get("/", ProductController.GetAllProducts)
router.get("/:id", ProductController.GetProductById)

module.exports = {
    AdminProductsRouter : router
}
