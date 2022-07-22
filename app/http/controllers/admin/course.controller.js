const { CourseModel } = require("../../../models/course.model");
const Controller = require("../controller");









class CourseController extends Controller {
    async GetAllCourses(req, res, next) {
        try {
            const { search } = req.query;
            let courses;
            if (search) courses = await CourseModel.find({ $text: { $search: search }}).sort({ _id: -1 })
            else courses = await CourseModel.find({}).sort({ _id : -1 });
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
