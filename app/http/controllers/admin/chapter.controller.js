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

}

module.exports = {
    ChapterController : new ChapterController(),
}