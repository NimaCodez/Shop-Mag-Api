const { EpisodeController } = require("../../http/controllers/admin/episode.controller");

const router = require("express").Router();

router.post("/add", EpisodeController.AddNewEpisode)

module.exports = {
    AdminEpisodesRouter : router
}
