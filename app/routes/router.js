const { graphqlHTTP } = require('express-graphql');
const { verifyAccessToken } = require('../http/middlewares/verifyAccessToken');
const { GQLConfig } = require('../utils/graphql.config');
const { adminRouter } = require('./admin/admin.routes');
const { IndexRouter } = require('./api');
const { DevRoutes } = require('./developer.routes');
const { AuthRouter } = require('./user/auth');

const Router = require('express').Router();

Router.use('/user', AuthRouter)
Router.use("/admin", verifyAccessToken, adminRouter)
Router.use('/dev', DevRoutes)
Router.use("/graphql", graphqlHTTP(GQLConfig))
Router.get('/', IndexRouter);

module.exports = Router;
