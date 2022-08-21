const { CreateEpisodeSchema } = require("../../validators/admin/course.schema");
const Controller = require("../controller");
const path = require("path");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { getTime, DeleteInvalidPropertyInObject, CopyObject } = require("../../../utils/functions");
const { CourseModel } = require("../../../models/course.model");
const createHttpError = require("http-errors");
const { MongoIdValidator } = require("../../validators/public");

class EpisodeController extends Controller {
    async AddNewEpisode(req, res, next) {
        try {
            const { title, text, type, chapterID, courseID, fileName, fileUploadPath } = await CreateEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath, fileName).replace(/\\/g, "/")
            const videoUrl = `${process.env.BASE_URL}:${process.env.APP_PORT}/${videoAddress}`
            const seconds = await getVideoDurationInSeconds(videoUrl)
            const time = getTime(seconds)
            const episode = { title, text, type, time, videoAddress }
            const CreateEpisodeResult = await CourseModel.updateOne({ _id: courseID, "chapters._id": chapterID }, {
                $push: {
                    "chapters.$.episodes": episode
                }
            })
            if (CreateEpisodeResult.modifiedCount == 0) throw createHttpError.InternalServerError("Episode was not added! ")
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

    async RemoveEpisode(req, res, next) {
        try {
            const { id: episodeID } = await MongoIdValidator.validateAsync({ id: req.params.episodeID })
            const DeleteResult = await CourseModel.updateOne({ "chapters.episodes._id": episodeID }, {
                $pull: {
                    "chapters.$.episodes": {
                        _id: episodeID
                    }
                }
            })
            if (DeleteResult.modifiedCount == 0) throw createHttpError.InternalServerError("Episode was not deleted! ")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Episode was deleted successfully! 🎉✨🔥"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async EditEpisode(req, res, next) {
        try {
            const { id: episodeID } = await MongoIdValidator.validateAsync({ id: req.params.episodeID });
            const episode = await this.GetOneEpisode(episodeID)
            const { fileName, fileUploadPath } = req.body;
            let blackListFields = ["_id"]
            if (fileName && fileUploadPath) {
                const fileAddress = path.join(fileUploadPath, fileName)
                req.body.videoAddress = fileAddress.replace(/\\/g, "/");
                const videoUrl = `${process.env.BASE_URL}:${process.env.APP_PORT}/${req.body.videoAddress}`
                const seconds = await getVideoDurationInSeconds(videoUrl);
                req.body.time = getTime(seconds)
                blackListFields.push("fileName")
                blackListFields.push("fileUploadPath")
            } else {
                blackListFields.push("time")
                blackListFields.push("videoAddress")
            }
            const data = req.body;
            DeleteInvalidPropertyInObject(data, blackListFields)
            const newEpisode = {
                ...episode,
                ...data
            }
            const EditResult = await CourseModel.updateOne({ "chapters.episodes._id": episodeID }, {
                $set: {
                    "chapters.$.episodes": newEpisode
                }
            })
            if (!EditResult.modifiedCount) throw createHttpError.InternalServerError("Episode was not edited! ")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Episode was edited successfully! 🎉✨🔥"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    
    async GetOneEpisode(episodeID) {
        const course = await CourseModel.findOne({ "chapters.episodes._id": episodeID })
        if (!course) throw createHttpError.NotFound("No epsiode was found!")
        const episode = await course?.chapters?.[0].episodes?.[0]
        if (!episode) throw createHttpError.NotFound("No episode was found 2")
        return CopyObject(episode)
    }
    
}

module.exports = {
    EpisodeController: new EpisodeController()
}
