const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver
    }
})

const RootMutations = new GraphQLObjectType({
    name: "RootMutations",
    fields: {

    }
})

const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutations,
})

module.exports = {
    graphqlSchema,
}
