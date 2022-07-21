const { ProductController } = require("../../http/controllers/admin/product.controller");
const { StringToArray } = require("../../http/middlewares/StringToArray");
const { UploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray                
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */ 

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
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  color:
 *                      $ref: '#/components/schemas/Color'
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
router.post("/add", UploadFile.array("images", 10), StringToArray("tags"), ProductController.AddProduct)
router.patch("/edit/:id", ProductController.EditProduct)
router.delete("/remove/:id", ProductController.RemoveProduct)
/**
 * @swagger
 *  /admin/products/:
 *      get:
 *          tags: [Product(Admin-Panel)]
 *          summary: get all the products
 *          responses:
 *              200:
 *                  description: GET successful
 *              404:
 *                  description: Np products was found
 *              500:
 *                  description: INTERNAL SERVER ERROR
 */
router.get("/", ProductController.GetAllProducts)
/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags: [Product(Admin-Panel)]
 *          summary: Get one product By Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: ObjectId of product
 *          responses:
 *              200:
 *                  description: GET successful
 *              400:
 *                  description: BadRequest | Maybe you have sent a wrong Id
 *              404:
 *                  description: NotFound | id can be incorrect
 *              500:
 *                  description: INTERNAL SERVER ERROR
 */
router.get("/:id", ProductController.GetProductById)

module.exports = {
    AdminProductsRouter : router
}
