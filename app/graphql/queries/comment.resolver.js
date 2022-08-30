const { GraphQLString, GraphQLObjectType } = require("graphql");
const createHttpError = require("http-errors");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { BlogModel } = require("../../models/blog.model");
const { ResponseType } = require("../typeDefs/public.type");
const { checkExistBlog } = require("../utils");

const CreateCommentForBlog = {
    type: ResponseType,
    args: {
        comment: { type: GraphQLString },
        blogID: { type: GraphQLString },
        parent: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await VerifyAccessTokenInGraphQL(req)
        const { comment, blogID, parent } = args;
        await checkExistBlog(blogID)
        await BlogModel.updateOne({ _id: blogID }, {
            $push: {
                comments: {
                    comment, user: user._id, show: false, openToComment: !parent
                }
            }
        })
        return {
            status: 201,
            data: {
                message: "Comment was posted Successfully! and it will be shown after submition 🎉"
            }
        }
    }
}

async function CheckExistBlog(id) {
    const blog = await BlogModel.findById(id);
    if (!blog) throw createHttpError.NotFound("No Blog with this ID")
    return blog;
}

module.exports = {
    CreateCommentForBlog
}
