const { GraphQLString } = require("graphql");
const { CommentType } = require("../typeDefs/comment.type");

const CreateCommentForBlog = {
    type: CommentType,
    args: {
        comment: { type: GraphQLString },
        blogID: { type: GraphQLString },
        parent: { type: GraphQLString }
    },
    resolve: (_, args, context) => {
        const { comment, blogID, parent } = args;
        console.log({comment, blogID, parent});
        return { comment, blogID, parent }
    }
}

module.exports = {
    CreateCommentForBlog
}
