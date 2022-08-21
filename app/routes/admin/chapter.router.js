const ChapterRouter = require("express").Router();
const { ChapterController } = require("../../http/controllers/admin/chapter.controller");

ChapterRouter.put("/add", PermissionGuard([PERMISSIONS.TEACHER]), ChapterController.AddChapter)
ChapterRouter.get("/list/:courseID", PermissionGuard([]), ChapterController.ChaptersOfCourse)
ChapterRouter.patch("/remove/:chapterID",PermissionGuard([PERMISSIONS.TEACHER]),  ChapterController.RemoveChapterById)
ChapterRouter.patch("/update/:chapterID", PermissionGuard([PERMISSIONS.TEACHER]), ChapterController.UpdateChapterByid)

module.exports = {
    AdminChapterRouter: ChapterRouter
}
