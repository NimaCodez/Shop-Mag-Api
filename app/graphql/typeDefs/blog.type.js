const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { CategoryType } = require("./category.type");
const { UserType } = require("./public.type");

const BlogType = new GraphQLObjectType({
    name: "BlogType",
    fields: {
        _id: { type: GraphQLString },
        author: { type: UserType },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: CategoryType },
    }
})

module.exports = {
    BlogType
}
