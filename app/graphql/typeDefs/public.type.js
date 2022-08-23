const { GraphQLObjectType, GraphQLString } = require("graphql");

const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    fields: {
        _id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString }
    }
})

module.exports = {
    AuthorType,
}
