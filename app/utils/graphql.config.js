const { graphqlSchema } = require("../graphql/index.resolver");

function GQLConfig(req, res) {
    return {
        schema: graphqlSchema,
        graphiql: true,
        context: { req, res }
    }
}

module.exports = {
    GQLConfig
}
