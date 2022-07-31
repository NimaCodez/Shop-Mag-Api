const { CreateEpisodeSchema } = require("../../validators/admin/course.schema");
const Controller = require("../controller");
const path = require("path");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { getTime } = require("../../../utils/functions");
const { CourseModel } = require("../../../models/course.model");
const createHttpError = require("http-errors");










class EpisodeController extends Controller {
    async AddNewEpisode(req, res, next) {
        try {
            const { title, text, type, chapterID, courseID, fileName, fileUploadPath } = await CreateEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath, fileName).replace(/\\/g, "/")
            console.log(videoAddress);
            const videoUrl = `${process.env.BASE_URL}:${process.env.APP_PORT}/${videoAddress}`
            const seconds = await getVideoDurationInSeconds(videoUrl)
            const time = getTime(seconds)
            const episode = { title, text, type, time, videoAddress }
            const CreateEpisodeResult = await CourseModel.updateOne({ _id: courseID, "chapters._id": chapterID }, {
                $push: {
                    "chapters.$.episodes": episode
                }
            })
            if(CreateEpisodeResult.modifiedCount == 0) throw createHttpError.InternalServerError("Episode was not added! ")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Episode was added successfully! 🎉✨🔥"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    EpisodeController: new EpisodeController()
}
