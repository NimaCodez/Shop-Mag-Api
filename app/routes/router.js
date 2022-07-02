const redisClient = require('../utils/init_redis');
const { IndexRouter } = require('./api');
const { DevRoutes } = require('./developer.routes');
const { AuthRouter } = require('./user/auth');

const Router = require('express').Router();
(async () => {
    await redisClient.set("key", "value");
    const value = await redisClient.get("key");
    console.log(value);
})()

Router.use('/user', AuthRouter)
Router.use('/dev', DevRoutes)
Router.get('/', IndexRouter);

module.exports = Router;