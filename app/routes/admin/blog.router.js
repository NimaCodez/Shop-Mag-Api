const { AdminBlogsController } = require("../../http/controllers/admin/blogs.controller");
const { StringToArray } = require("../../http/middlewares/StringToArray");
const { UploadFile } = require("../../utils/multer");
const AdminBlogsRouter = require("express").Router();

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: get All Blogs
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwNDE3NTIxMCIsImlhdCI6MTY1NzY5MDYzMCwiZXhwIjoxNjU3Njk0MjMwfQ.Rzda49iiaJAH6JIe9E2AoZ_qQsIbjfalKXUNjHqLwPE
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */
AdminBlogsRouter.get("/", AdminBlogsController.GetAllBlogs)

/**
 * @swagger
 *  /admin/blogs/new:
 *      post:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: Create new blog document
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMwNDE3NTIxMCIsImlhdCI6MTY1NzY5MDYzMCwiZXhwIjoxNjU3Njk0MjMwfQ.Rzda49iiaJAH6JIe9E2AoZ_qQsIbjfalKXUNjHqLwPE
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: text
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: category
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: image
 *                  type: file
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag_foo#foobar
 *                  type: string
 *                  required: true
 *          responses:
 *              201:
 *                  description: Created
 *              400:
 *                  description: Bad Request (Params Maybe sent badly)
 *              500:
 *                  description: Internal Server Error
 */
AdminBlogsRouter.post("/new", UploadFile.single("image"), StringToArray("tags"), AdminBlogsController.CreateBlog)

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          tags: [Blogs(Admin-Panel)]
 *          summary: Get blog bu blogId
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: header
 *                  name: access-token
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
AdminBlogsRouter.get("/:id", AdminBlogsController.GetBlogById);

module.exports = {
    AdminBlogsRouter
}
