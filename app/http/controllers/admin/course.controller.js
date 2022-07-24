const { CourseModel } = require("../../../models/course.model");
const { CopyObject } = require("../../../utils/functions");
const Controller = require("../controller");
const path = require("path");
const { CreateCourseSchema } = require("../../validators/admin/course.schema");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");

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
            if (!course?._id) throw createHttpError.InternalServerError("Course was not added")
            return res.status(200).json({
                status: 201,
                success: true,
                data: {
                    message: "Course was created successfully 🎉✨"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async GetCourseById(req, res, next) {
        try {
            const { id } = req.params;
            const course = await CourseModel.findOne({ _id: id });
            if (!course) throw createHttpError.NotFound("No course was found with that Is")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    course
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async AddChapter(req, res, next) {
        try {
            const { id, title, text } = req.body;
            await this.FindCourseById(id)
            const SaveChapterResult = await CourseModel.updateOne({ _id: id }, { $push: {
                chapters: { title, text, episodes: [] }
            }})
            if (SaveChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("Chapter was not added")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Chpater was added to course! 🎉✨🔥"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async FindCourseById(id) {
        try {
            if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("Id is not correct")
            const course = await CourseModel.findById(id);
            if (!course) throw createHttpError.NotFound("No Course was found! ")
            return course;
        } catch (error) {
            next(error)
        }
    }   
}

module.exports = {
    CourseController : new CourseController()
}
