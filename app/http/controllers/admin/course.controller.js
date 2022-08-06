const { CourseModel } = require("../../../models/course.model");
const { CopyObject, DeleteInvalidPropertyInObject, DeleteFileInPublic } = require("../../../utils/functions");
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
            if (search) courses = await CourseModel
            .find({ $text: { $search: search } })
            .populate([
                { path: "category", select: { "category.children": 0, __v: 0, parent: 0 }},
                { path: "teacher", select: { first_name: 1, last_name: 1,
                mobile: 1, email: 1 }}
            ])
            .sort({ _id: -1 })
            else courses = await CourseModel
            .find({})
            .populate([
                { path: "category", select: { children: 0, __v: 0, parent: 0 }},
                { path: "teacher", select: { first_name: 1, last_name: 1,
                mobile: 1, email: 1 }}
            ])
            .sort({ _id: -1 })
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
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

    async UpdateCourseById(req, res, next) {
        try {
            const { id } = req.params;
            const course = await this.FindCourseById(id);
            const data = CopyObject(req.body);
            const { fileUploadPath, fileName } = req.body;
            let blackList = ["time", "episodes", "chapters", "students", "likes", "bookmarks", "dislikes", "comments", "fileUploadPath", "fileName"]
            DeleteInvalidPropertyInObject(data, blackList);
            if (req.file) {
                data.image = path.join(req.get("host"),fileUploadPath, fileName).replace(/\\/gi, "/");
                DeleteFileInPublic(course.image)
            }
            return res.json(data)
        } catch (error) {
            next(error)
        }
    }

    async FindCourseById(id) {
        if (!mongoose.isValidObjectId(mongoose.Types.ObjectId(id))) throw createHttpError.BadRequest("Id is not correct")
        const course = await CourseModel.findOne({ _id: mongoose.Types.ObjectId(id) });
        console.log(course);
        if (!course) throw createHttpError.NotFound("No Course was found! ")
        return course;
    }
}

module.exports = {
    CourseController: new CourseController(),
}
