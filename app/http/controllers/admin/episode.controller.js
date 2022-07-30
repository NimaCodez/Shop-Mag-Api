const { CreateEpisodeSchema } = require("../../validators/admin/course.schema");
const Controller = require("../controller");
const path = require("path");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { getTime } = require("../../../utils/functions");





















class EpisodeController extends Controller {
    async AddNewEpisode(req, res, next) {
        try {
            const { title, text, chapterID, courseID } = await CreateEpisodeSchema.validateAsync(req.body);
            const { fileName, fileUploadPath } = req.body;
            const videoAddress = path.join(fileUploadPath, fileName).replace(/\\/g, "/")
            console.log(fileName, fileUploadPath);
            const videoUrl = `${process.env.BASE_URL}:${process.env.APP_PORT}/${videoAddress}`
            const seconds = await getVideoDurationInSeconds(videoUrl)
            const time = await getTime(seconds)
            return res.status(200).json({
                title, text, chapterID, courseID, fileName, fileUploadPath, time
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    EpisodeController: new EpisodeController()
}
