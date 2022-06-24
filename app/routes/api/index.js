const {HomeController} = require('../../http/controllers/api/home.controller');

const router = require('express').Router();

router.get('/', HomeController.indexPage);

module.exports = {
    IndexRouter: router
}