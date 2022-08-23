const { GraphQLObjectType, GraphQLString } = require("graphql")

const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: {
        title: { type: GraphQLString },
        _id: { type: GraphQLString }
    }
})

module.exports = {
    CategoryType
}
