const { IndexRouter } = require('./api');

const Router = require('express').Router();

Router.get('/', IndexRouter);

module.exports = Router;