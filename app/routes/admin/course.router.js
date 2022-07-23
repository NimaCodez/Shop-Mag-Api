const { CourseController } = require("../../http/controllers/admin/course.controller");
const { StringToArray } = require("../../http/middlewares/StringToArray");
const { UploadFile } = require("../../utils/multer");

const courseRouter = require("express").Router();

courseRouter.get("/list", CourseController.GetAllCourses) // Get All the courses

courseRouter.post("/add", UploadFile.single("image"), StringToArray("tags"), CourseController.AddCourse)

courseRouter.get("/:id", CourseController.GetCourseById) // get one course


// courseRouter.put() // Create new chapter
// courseRouter.put() // Create new episode
// courseRouter.delete() // remove a course
// courseRouter.patch() // Edit a course


module.exports = {
    AdminCourseRouter: courseRouter,
}
