const { AdminBlogsRouter } = require('./blog.router');
const { AdminCategoryRouter } = require('./category.router');
const { AdminChapterRouter } = require('./chapter.router');
const { AdminCourseRouter } = require('./course.router');
const { AdminEpisodesRouter } = require('./episode.router');
const { AdminPermissionsRouter } = require('./permissions.router');
const { AdminProductsRouter } = require('./product.router');
const { AdminRolesRouter } = require('./roles.router');
const { AdminUsersRoutes } = require('./user.router');
const adminRouter = require('express').Router();

adminRouter.use('/category', AdminCategoryRouter)
adminRouter.use('/blogs', AdminBlogsRouter)
adminRouter.use('/products', AdminProductsRouter)
adminRouter.use('/permission', AdminPermissionsRouter)
adminRouter.use('/courses', AdminCourseRouter)
adminRouter.use('/chapter', AdminChapterRouter)
adminRouter.use('/episode', AdminEpisodesRouter)
adminRouter.use('/users', AdminUsersRoutes)
adminRouter.use('/role', AdminRolesRouter)

module.exports = {
    adminRouter
}
