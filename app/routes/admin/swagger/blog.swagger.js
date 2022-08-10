
/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Blog title
 *                  short_text:
 *                      type: string
 *                      description: Short intro text of Blog
 *                  text:
 *                      type: string
 *                      description: Actual Blog Text
 *                  tags:
 *                      type: string
 *                      description: Related tags to blog
 *                  category:
 *                      type: string
 *                      description: Related categories Id
 *                  image:
 *                      type: file
 *                      description: Blog picture
 */

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: get All Blogs
 *          responses:
 *              200:
 *                  description: Success
 */


/**
 * @swagger
 *  /admin/blogs/new:
 *      post:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: Create new blog document
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema: 
 *                          $ref: '#/components/schemas/Blog'
 *          responses:
 *              201:
 *                  description: Created
 *              400:
 *                  description: Bad Request (Params Maybe sent badly)
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: Update blog document by id
 *          parameters:
 *              -   in: path
 *                  name: id 
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  type: file
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag_foo#foobar
 *                  type: string
 *          responses:
 *              200:
 *                  description: Updated
 *              400:
 *                  description: Bad Request (Params Maybe sent badly)
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: Get blog by blogId
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: GET success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: INTERNAL SERVER ERROR
 */

/**
 * @swagger
 *  /admin/blogs/remove/{id}:
 *      delete:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: Delete blog by blogId
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: GET success
 *              404:
 *                  description: Not found
 *              500:
 *                  description: INTERNAL SERVER ERROR
 */
