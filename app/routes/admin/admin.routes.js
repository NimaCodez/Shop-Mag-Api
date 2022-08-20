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

adminRouter.use('/category', PermissionGuard([PERMISSIONS.AUTHOR]), AdminCategoryRouter)
adminRouter.use('/blogs', PermissionGuard([PERMISSIONS.AUTHOR, PERMISSIONS.TEACHER]), AdminBlogsRouter)
adminRouter.use('/products', PermissionGuard([PERMISSIONS.SUPPLIER, PERMISSIONS.AUTHOR]), AdminProductsRouter)
adminRouter.use('/permission', PermissionGuard([PERMISSIONS.ADMIN]), AdminPermissionsRouter)
adminRouter.use('/courses', PermissionGuard([PERMISSIONS.TEACHER, PERMISSIONS.AUTHOR]), AdminCourseRouter)
adminRouter.use('/chapter', PermissionGuard([PERMISSIONS]), AdminChapterRouter)
adminRouter.use('/episode', PermissionGuard([PERMISSIONS]), AdminEpisodesRouter)
adminRouter.use('/users', PermissionGuard([PERMISSIONS.USER]), PermissionGuard(["user"]), AdminUsersRoutes)
adminRouter.use('/role', PermissionGuard([PERMISSIONS]), AdminRolesRouter)

module.exports = {
    adminRouter
}
