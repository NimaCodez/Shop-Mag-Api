const { GraphQLString, GraphQLObjectType } = require("graphql");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { BlogModel } = require("../../models/blog.model");
const { CopyObject } = require("../../utils/functions");
const { ResponseType } = require("../typeDefs/public.type");

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
        await CheckExistBlog(blogID)
        let CommentDoc;
        if (parent && mongoose.isValidObjectId(parent)) {
            CommentDoc = await GetComment(BlogModel, parent)
        }
        await BlogModel.updateOne({ _id: blogID }, {
            $push: {
                comments: {
                    comment,
                    user: user._id,
                    show: false,
                    openToComment: !parent,
                    parent: mongoose.isValidObjectId(parent) ? parent : undefined
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

async function GetComment(model, id){
    const FoundComment =  await model.findOne({"comments._id": id},  {"comments.$" : 1});
    const comment = CopyObject(FoundComment)
    if(!comment?.comments?.[0]) throw createHttpError.NotFound("No Comment was Found")
    return comment?.comments?.[0]
}

async function CheckExistBlog(id) {
    const blog = await BlogModel.findById(id);
    if (!blog) throw createHttpError.NotFound("No Blog with this ID")
    return blog;
}

module.exports = {
    CreateCommentForBlog
}
