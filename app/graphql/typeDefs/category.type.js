const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql")
const { AnyType } = require("./public.type")

const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: {
        title: { type: GraphQLString },
        _id: { type: GraphQLString },
        children: { type: new GraphQLList(AnyType) }
    }
})

module.exports = {
    CategoryType
}
