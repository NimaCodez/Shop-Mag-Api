const { AdminBlogsRouter } = require('./blog.router');
const { CategoryRouter } = require('./category.router');
const adminRouter = require('express').Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: Admin ROUTES With pro Accessibility
 *      -   name: Category(Admin-Panel)
 *          description: Admin Panel Rights and routes for categories
 *      -   name: Blogs(Admin-Panel)
 *          description: Admin Panel Rights and routes for Blogs
 */
adminRouter.use('/category', CategoryRouter)
adminRouter.use('/blogs', AdminBlogsRouter)
module.exports = {
    adminRouter
}
