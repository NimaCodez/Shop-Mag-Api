const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { BlogModel } = require("../../../models/blog.model");
const { DeleteFileInPublic } = require("../../../utils/functions");
const { CreateBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");

class BlogController extends Controller {
    async CreateBlog(req, res, next) {
        try {
            const BlogDataBody = await CreateBlogSchema.validateAsync(req.body);
            const { title, short_text, text, category, tags } = req.body;
            req.body.image = path.join(BlogDataBody.fileUploadPath, req.fileName).replace(/\\/gi, "/")
            const image = req.body.image;
            const author = req.user._id;
            const CreateResult = await BlogModel.create({ author, title, short_text, text, image, category, tags })
            return res.json({
                CreateResult: CreateResult
            })
        } catch (error) {
            DeleteFileInPublic(req.body.image)
            next(error)
        }
    }

    async GetAllBlogs(req, res, next) {
        try {
            const blogs = await BlogModel.aggregate([
                { $match: {} },
                { $lookup: { from: "users", foreignField: "_id", localField: "author", as: "author" } },
                { $unwind: "$author" },
                { $lookup: { from: "categories", foreignField: "_id", localField: "category", as: "category" } },
                { $unwind: "$category" },
                {
                    $project: {
                        "author.otp": 0, "author.__v": 0, "author.bills": 0, "author.discount": 0, "author.createdAt": 0, "author.updatedAt": 0, "author.Role": 0, "category.parent": 0, "category.__v": 0, "createdAt": 0, "__v": 0, "updatedAt": 0
                    }
                }
            ])
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    blogs
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async GetBlogById(req, res, next) {
        try {
            const { id } = req.params;
            const blog = await this.FindBlog(id);
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    blog
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async EditBlog(req, res, next) {
        try {
            const { id } = req.params;
            await this.FindBlog(id);
            if (req?.body?.fileUploadPath && req?.fileName) {
                req.body.image = path.join(req?.body?.fileUploadPath, req.fileName).replace(/\\/gi, "/");
            }
            const data = req.body;
            let nullishData = ["", " ", "0", 0, null, undefined];
            let BlackListFields = ["author", "likes", "comments", "dislikes", "bookmarks"];
            Object.keys(data).forEach(key => {
                if (BlackListFields.includes(data[key])) delete data[key];
                if (typeof data[key] == "string") data[key] = data[key].trim();
                if (Array.isArray(data[key]) && Array.length > 0 ) data[key] = data[key].map(item => item.trim());
                if (nullishData.includes(data[key])) delete data[key];
            })
            const UpdateResult = await BlogModel.updateOne({ _id: id }, { $set: data })
            if (UpdateResult.modifiedCount == 0) throw createHttpError.InternalServerError("Update was not done 🗿")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Blog updated successfully 🎉✨",
                }
            })
        } catch (error) {
            DeleteFileInPublic(req.body?.fileUploadPath)
            next(error)
        }
    }

    async RemoveBlog(req, res, next) {
        try {
            const { id } = req.params;
            const deleteResult = await BlogModel.deleteOne({ _id : id });
            if (deleteResult.deletedCount == 0) throw createHttpError.InternalServerError("Blog was not deleted")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Successfully deleted 🎉✨ "
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async FindBlog(id) {
        const blog = await BlogModel.findById(id).populate([
            { path: "category", select: ['title'] },
            { path: "author", select: ['mobile', 'first_name', 'last_name', 'username' ] }
        ])
        if (!blog) throw createHttpError.NotFound("There is no such a Mag Here! 🐢🗿");
        return blog;
    }
}

module.exports = {
    AdminBlogsController: new BlogController(),
}
