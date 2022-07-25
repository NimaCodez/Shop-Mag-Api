const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { CourseModel } = require("../../../models/course.model");
const Controller = require("../controller");
const { CourseController } = require("./course.controller");

class ChapterController extends Controller {
    
    async AddChapter(req, res, next) {
        try {
            const { id, title, text } = req.body
            await CourseController.FindCourseById(id)
            const SaveChapterResult = await CourseModel.updateOne({ _id: id }, {
                $push: {
                    chapters: { title, text, episodes: [] }
                }
            })
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
    
    async ChaptersOfCourse(req, res, next) {
        try {
            const { chapterID } = req.params;
            const chapters = await this.GetChaptersOfCourse(chapterID)
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    chapters
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async GetChaptersOfCourse(id) {
        const chapters = await CourseModel.findOne({ _id: mongoose.Types.ObjectId(id) }, { chapters: 1, title: 1 })
        if (!chapters) createHttpError.NotFound("No Course was Found with this Id")
        return chapters;
    }

    async CheckExistChapter(id) {
        const chapter = await CourseModel.findOne({ "chapters._id" : id }, { "chapters.$": 1 });
        if (chapter) return createHttpError.NotFound("No Chapter with this Id was found! ")
        return chapter;
    }

}

module.exports = {
    ChapterController : new ChapterController(),
}