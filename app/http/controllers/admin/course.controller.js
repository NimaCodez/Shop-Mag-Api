const { CourseModel } = require("../../../models/course.model");
const Controller = require("../controller");

class CourseController extends Controller {
    async GetAllCourses(req, res, next) {
        try {
            const courses = await CourseModel.find({});
            return res.status(200).json({
                status: 200,
                success: true,
                data : {
                    courses
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    CourseController : new CourseController()
}
