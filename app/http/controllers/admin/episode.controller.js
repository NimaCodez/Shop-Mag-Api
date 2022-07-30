const { CreateEpisodeSchema } = require("../../validators/admin/course.schema");
const Controller = require("../controller");

class EpisodeController extends Controller {
    AddNewEpisode(req, res, next) {
        try {
            const { title, time, text, chapterID, courseID } = await CreateEpisodeSchema.validateAsync(req.body)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    EpisodeController: new EpisodeController()
}
