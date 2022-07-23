const { AdminBlogsController } = require("../../http/controllers/admin/blogs.controller");
const { StringToArray } = require("../../http/middlewares/StringToArray");
const { UploadFile } = require("../../utils/multer");
const AdminBlogsRouter = require("express").Router();

AdminBlogsRouter.get("/", AdminBlogsController.GetAllBlogs)

AdminBlogsRouter.post("/new", UploadFile.single("image"), StringToArray("tags"), AdminBlogsController.CreateBlog)

AdminBlogsRouter.patch("/update/:id", UploadFile.single("image"), StringToArray("tags"), AdminBlogsController.EditBlog)

AdminBlogsRouter.get("/:id", AdminBlogsController.GetBlogById);

AdminBlogsRouter.delete("/remove/:id", AdminBlogsController.RemoveBlog);

module.exports = {
    AdminBlogsRouter
}
