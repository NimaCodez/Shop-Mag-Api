const { CourseController } = require("../../http/controllers/admin/course.controller")
const { StringToArray } = require("../../http/middlewares/StringToArray");
const { UploadFile } = require("../../utils/multer");

const courseRouter = require("express").Router();

courseRouter.get("/list", PermissionGuard([]), CourseController.GetAllCourses) // Get All the courses

courseRouter.post("/add", PermissionGuard([PERMISSIONS.TEACHER]), UploadFile.single("image"), StringToArray("tags"), CourseController.AddCourse)

courseRouter.get("/:id", PermissionGuard([]), CourseController.GetCourseById) // get one course

courseRouter.patch("/update/:id", PermissionGuard([PERMISSIONS.TEACHER]), UploadFile.single("image"), CourseController.UpdateCourseById) // Edit a courses

module.exports = {
    AdminCourseRouter: courseRouter,
}
