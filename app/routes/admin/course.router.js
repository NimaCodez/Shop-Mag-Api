const { CourseController } = require("../../http/controllers/admin/course.controller");
const { PermissionGuard } = require("../../http/middlewares/Permission.guard");
const { StringToArray } = require("../../http/middlewares/StringToArray");
const { PERMISSIONS } = require("../../utils/constants");
const { UploadFile } = require("../../utils/multer");

const courseRouter = require("express").Router();

courseRouter.get("/list", PermissionGuard([]), CourseController.GetAllCourses)

courseRouter.post("/add", PermissionGuard([PERMISSIONS.TEACHER]), UploadFile.single("image"), StringToArray("tags"), CourseController.AddCourse)

courseRouter.get("/:id", PermissionGuard([]), CourseController.GetCourseById)

courseRouter.patch("/update/:id", PermissionGuard([PERMISSIONS.TEACHER]), UploadFile.single("image"), CourseController.UpdateCourseById)

module.exports = {
    AdminCourseRouter: courseRouter,
}
