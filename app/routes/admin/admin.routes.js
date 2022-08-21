const { PermissionGuard } = require('../../http/middlewares/Permission.guard');
const { PERMISSIONS } = require('../../utils/constants');
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

adminRouter.use('/products', AdminProductsRouter)
adminRouter.use('/blogs', AdminBlogsRouter)
adminRouter.use('/courses', AdminCourseRouter)
adminRouter.use('/chapter', AdminChapterRouter)
adminRouter.use('/episode', PermissionGuard([PERMISSIONS.TEACHER]), AdminEpisodesRouter)
adminRouter.use('/users', AdminUsersRoutes)
adminRouter.use('/category', AdminCategoryRouter)
adminRouter.use('/role', PermissionGuard([PERMISSIONS.ADMIN]), AdminRolesRouter)
adminRouter.use('/permission', PermissionGuard([PERMISSIONS.ADMIN]), AdminPermissionsRouter)

module.exports = {
    adminRouter
}
