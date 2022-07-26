const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { CourseModel } = require("../../../models/course.model");
const Controller = require("../controller");
const { CourseController } = require("./course.controller");

class ChapterController extends Controller {
    
    // This function takes user's Input (id, title, text) and creates a chapter with given data in course
    async AddChapter(req, res, next) {
        try {
            const { id, title, text } = req.body;
            // Cheks if course exists or not
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
    
    // This function returns all the saved chapters for a course.
    async ChaptersOfCourse(req, res, next) {
        try {
            const { courseID } = req.params;
            const chapters = await this.GetChaptersOfCourse(courseID)
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

    // This function first checks that if the course exists or not, then returns all the saved chapters.
    async GetChaptersOfCourse(id) {
        await CourseController.FindCourseById(id)
        const chapters = await CourseModel.findOne({ _id: mongoose.Types.ObjectId(id) }, { chapters: 1, title: 1 })
        if (!chapters) createHttpError.NotFound("No Course was Found with this Id")
        return chapters;
    }
    
    async GetOneChapter(id) {
        await CourseController.FindCourseById(id)
        const chapter = await CourseModel.findOne({ "chapters._id" : id }, { "chapters.$": 1 });
        if (chapter) return createHttpError.NotFound("No Chapter with this Id was found! ")
        return chapter;
    }

    // TODO: Complete this code and write swagger + Debug
    async RemoveChapterByI(id) {
        const { courseID } = req.params;
        const chapter = await this.GetOneChapter(courseID)
        const UpdateChapterResult = await CourseModel.updateOne({ "chapters._id": courseID }, {
            $pull: { "chapters._id": courseID }
        })

        if(UpdateChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("Update was not done! ")
        return res.status(200).json({
            status: 200,
            success: true,
            data: {
                message: "Update was successfully done! 🔥✨🎉"
            }
        })
    }
    
}

module.exports = {
    ChapterController : new ChapterController(),
}