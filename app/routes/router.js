const { verifyAccessToken, CheckRole } = require('../http/middlewares/verifyAccessToken');
const redisClient = require('../utils/init_redis');
const { adminRouter } = require('./admin/admin.routes');
const { IndexRouter } = require('./api');
const { DevRoutes } = require('./developer.routes');
const { AuthRouter } = require('./user/auth');

const Router = require('express').Router();

Router.use('/user', AuthRouter)
Router.use("/admin", verifyAccessToken, adminRouter)
Router.use('/dev', DevRoutes)
Router.get('/', IndexRouter);
module.exports = Router;