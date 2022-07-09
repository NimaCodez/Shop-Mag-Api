const { AdminBlogsController } = require("../../http/controllers/admin/blogs.controller");

const AdminBlogsRouter = require("express").Router();

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
AdminBlogsRouter.get("/", AdminBlogsController.GetAllBlogs)

module.exports = {
    AdminBlogsRouter
}
