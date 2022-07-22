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
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان محصول
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلند تستی
 *                  tags:
 *                      type: array
 *                      description: the title of product
 *                  category:
 *                      type: string
 *                      description: the title of product
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                      example: 20
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                      example: 100
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                      example: 0
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                      example: 0
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                      example: 0
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                      example: 0
 *                  type:
 *                      type: string
 *                      description: the type of product 
 *                      example: virtual - physical
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 *                      
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Product:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان محصول
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 *                  tags:
 *                      type: array
 *                      description: the title of product
 *                  category:
 *                      type: string
 *                      description: the title of product
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                      example: 20
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                      example: 100
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                      example: 0
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                      example: 0
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                      example: 0
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                      example: 0
 *                  type:
 *                      type: string
 *                      description: the type of product 
 *                      example: virtual - physical
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 *                      
 */


/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Product(AdminPanel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          
 *          responses:
 *              201:
 *                  description: created new Product
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
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

/**
* @swagger
*  /admin/products/edit/{id}:
*      patch:
*          tags: [Product(Admin-Panel)]
*          summary: updates a product
*          parameters: 
*              -    in: path
*                   name: id
*                   type: string
*                   required: true
*          requestBody:
*              required: true
*              content:
*                  multipart/form-data:
*                      schema:
*                          $ref: '#/components/schemas/Edit-Product'
*          responses:
*              200:
*                  description: Updated product
*/
router.patch("/edit/:id", UploadFile.array("images"), StringToArray("tags", "colors"), ProductController.EditProduct)

/**
 * @swagger
 *  /admin/products/remove/{id}:
 *      delete:
 *          tags: [Product(Admin-Panel)]
 *          summary: Delete one product with Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: Product's Objectid
 *          responses:
 *              200:
 *                  description: Deleted
 *              400:
 *                  description: bad Request
 *              404:
 *                  description: Product was not found
 *              500:
 *                  description: INTERNAL SERVER ERROR
 */
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
