const { CourseController } = require("../../http/controllers/admin/course.controller");

const courseRouter = require("express").Router();

/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags: [Course(Admin-Panel)]
 *          summary: Get All courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: serach in course by text, title, short_text
 *          responses:
 *              200:
 *                  description: GET OK
 *              400:
 *                  description: Bad Request
 *              404:
 *                  description: Broken Url or and courses were not found
 *              500:
 *                  description: INTERNAL SERVER ERROR
 */
courseRouter.get("/list", CourseController.GetAllCourses) // Get All the courses
// courseRouter.post() // Create new course
// courseRouter.put() // Create new chapter
// courseRouter.put() // Create new episode
// courseRouter.delete() // remove a course
// courseRouter.patch() // Edit a course
// courseRouter.get() // get one course

module.exports = {
    AdminCourseRouter: courseRouter,
}
