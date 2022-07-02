const { CategoryRouter } = require('./category.router');
const adminRouter = require('express').Router();

/**
 * @swagger
 *  tags:
 *      name: Admin-Panel
 *      description: Admin ROUTES With pro Accessibility
 */
adminRouter.use('/category', CategoryRouter)

module.exports = {
    adminRouter
}
