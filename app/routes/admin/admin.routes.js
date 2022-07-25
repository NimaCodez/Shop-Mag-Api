const { AdminBlogsRouter } = require('./blog.router');
const { AdminCategoryRouter } = require('./category.router');
const { AdminCourseRouter } = require('./course.router');
const { AdminProductsRouter } = require('./product.router');
const adminRouter = require('express').Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: Admin ROUTES With pro Accessibility 
 *      -   name: AuthRoutes
 *          description: User Auth Routes
 *      -   name: Course(Admin-Panel)
 *          description: Admin routes of courses for management.
 *      -   name: Product(Admin-Panel)
 *          description: Admin Rights for products
 *      -   name: Category(Admin-Panel)
 *          description: Admin Panel Rights and routes for categories
 *      -   name: Blogs(Admin-Panel)
 *          description: Admin Panel Rights and routes for Blogs
 */
adminRouter.use('/category', AdminCategoryRouter)
adminRouter.use('/blogs', AdminBlogsRouter)
adminRouter.use('/products', AdminProductsRouter)
adminRouter.use('/courses', AdminCourseRouter)

module.exports = {
    adminRouter
}
