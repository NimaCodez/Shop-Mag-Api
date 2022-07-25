const ChapterRouter = require("express").Router();
const { ChapterController } = require("../../http/controllers/admin/chapter.controller");

ChapterRouter.put("/add", ChapterController.AddChapter)

module.exports = {
    AdminChapterRouter: ChapterRouter
}
