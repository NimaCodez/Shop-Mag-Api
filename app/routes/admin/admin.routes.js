const { CategoryRouter } = require('./category.router');
const adminRouter = require('express').Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: Admin ROUTES With pro Accessibility
 *      -   name: Category(Admin-Panel)
 *          description: Admin Panel Rights and routes for categories
 */
adminRouter.use('/category', CategoryRouter)

module.exports = {
    adminRouter
}
