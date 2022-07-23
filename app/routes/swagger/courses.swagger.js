/**
 * @swagger
 *  components:
 *      schemas:
 *          Type:
 *              type: array
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   Free
 *                      -   Cash
 *                      -   Special
 */ 

/**
 * @swagger
 *  components:
 *      schemas:
 *          Course:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Course's title
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: string
 *                      description: Course's short description
 *                      example: متن توضیحات کامل تستی
 *                  text:
 *                      type: string
 *                      description: Courses's Ful text
 *                      example: متن توضیحات کامللل تستی
 *                  tags:
 *                      type: array
 *                      description: Course's related tags
 *                  category:
 *                      type: string
 *                      description: Course's Category
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: Course's price
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: Course's discount
 *                      example: 20
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type:
 *                      type: string
 *                      description: Course's type
 *                      example: free, cashed, espesial
 *                  Types:
 *                      $ref: '#/components/schemas/Type'
 *                      
 */

/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags: [Course(Admin-Panel)]
 *          summary: Get All courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: serach in course by text, title, short_text
 *          responses:
 *              200:
 *                  description: GET OK
 *              400:
 *                  description: Bad Request
 *              404:
 *                  description: Broken Url or and courses were not found
 *              500:
 *                  description: INTERNAL SERVER ERROR
 */

/**
 * @swagger
 *  /admin/courses/add:
 *      post:
 *          tags: [Course(Admin-Panel)]
 *          summary: Add a course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *          responses:
 *              201:
 *                  descrition: CREATED
 */

/**
 * @swagger
 *  /admin/courses/{id}:
 *      get:
 *          tags: [Course(Admin-Panel)]
 *          summary: Get a course with Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  description: Course's Id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: GET OK
 *              400:
 *                  description: Bad Request (Maybe params are sent bad.)
 *              404:
 *                  description: Not Found
 *              500:
 *                  description: INTERNAL SERVER ERROR
 */