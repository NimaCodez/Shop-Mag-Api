const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { UserType } = require("./public.type");

const CommentAnswerType = new GraphQLObjectType({
    name: "CommentAnswerType",
    fields: {
        user: { type: UserType },
        comment: { type: GraphQLString },
        openToComment: { type: GraphQLBoolean },
        show: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString }
    }
})

const CommentType = new GraphQLObjectType({
    name: "CommentType",
    fields: {
        user: { type: UserType },
        comment: { type: GraphQLString },
        answers: { type: new GraphQLList(CommentAnswerType) },
        show: { type: GraphQLBoolean },
        openToComment: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString }
    }
})

module.exports = {
    CommentType
}