const { IndexRouter } = require('./api');
const { AuthRouter } = require('./user/auth');

const Router = require('express').Router();

Router.use('/user', AuthRouter)
Router.post('/', IndexRouter);

module.exports = Router;