const { CourseModel } = require("../../../models/course.model");
const { CopyObject } = require("../../../utils/functions");
const Controller = require("../controller");
const path = require("path");
const { CreateCourseSchema } = require("../../validators/admin/course.schema");
const createHttpError = require("http-errors");

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
            await CreateCourseSchema.validateAsync(req.body);
            const { fileUploadPath, fileName } = req.body;
            const image = path.join(fileUploadPath, fileName).replace(/\\/g, "/")
            const { title, short_text, text, tags, category, price, discount } = req.body;
            console.log(req.body)
            const teacher = req.user._id
            const course = await CourseModel.create({
                title,
                short_text,
                text, tags,
                category,
                price,
                discount,
                image,
                time: "00:00:00",
                status: "Not Started",
                teacher
            })
            console.log(course)
            if (!course?._id) throw createHttpError.InternalServerError("Course was not added")
            return res.status(200).json({
                status: 201,
                success: true,
                message: "Course was created successfully 🎉✨"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    CourseController : new CourseController()
}
