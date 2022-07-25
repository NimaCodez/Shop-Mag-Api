const ChapterRouter = require("express").Router();
const { ChapterController } = require("../../http/controllers/admin/chapter.controller");

ChapterRouter.put("/add", ChapterController.AddChapter)
ChapterRouter.get("/list/:chapterID", ChapterController.ChaptersOfCourse)

module.exports = {
    AdminChapterRouter: ChapterRouter
}
