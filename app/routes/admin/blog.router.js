const { AdminBlogsController } = require("../../http/controllers/admin/blogs.controller");
const { PermissionGuard } = require("../../http/middlewares/Permission.guard");
const { StringToArray } = require("../../http/middlewares/StringToArray");
const { PERMISSIONS } = require("../../utils/constants");
const { UploadFile } = require("../../utils/multer");
const AdminBlogsRouter = require("express").Router();

AdminBlogsRouter.get("/", PermissionGuard([]), AdminBlogsController.GetAllBlogs)

AdminBlogsRouter.post("/new", PermissionGuard([PERMISSIONS.TEACHER]), UploadFile.single("image"), StringToArray("tags"), AdminBlogsController.CreateBlog)

AdminBlogsRouter.patch("/update/:id", PermissionGuard([PERMISSIONS.TEACHER]), UploadFile.single("image"), StringToArray("tags"), AdminBlogsController.EditBlog)

AdminBlogsRouter.get("/:id", AdminBlogsController.GetBlogById);

AdminBlogsRouter.delete("/remove/:id", PermissionGuard([PERMISSIONS.TEACHER]), AdminBlogsController.RemoveBlog);

module.exports = {
    AdminBlogsRouter
}
