const { CourseModel } = require("../../../models/course.model");
const { CopyObject } = require("../../../utils/functions");
const Controller = require("../controller");
const path = require("path");

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

    async AddCourse(req, res, next) {
        try {
            const { fileUploadPath, fileName } = req.body;
            const image = path.join(fileUploadPath, fileName).replace(/\\/g, "/")
            const { title, short_text, text, tags, cateory, price, discount } = req.body;
            const data = CopyObject(req.body);
            return res.status(200).json({
                title, short_text, text, tags, cateory, price, discount, image
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    CourseController : new CourseController()
}
