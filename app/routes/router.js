const redisClient = require('../utils/init_redis');
const { IndexRouter } = require('./api');
const { AuthRouter } = require('./user/auth');

const Router = require('express').Router();
(async () => {
    await redisClient.set("key", "value");
    const value = await redisClient.get("key");
    console.log(value);
})()

Router.use('/user', AuthRouter)
Router.get('/', IndexRouter);

module.exports = Router;