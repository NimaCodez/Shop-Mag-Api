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
                BlogDataBody,
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
                {
                    $lookup: {
                        from: "users",
                        foreignField: "_id",
                        localField: "author",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $lookup: {
                        from: "categories",
                        foreignField: "_id",
                        localField: "category",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $project: {
                        "author.otp": 0,
                        "author.__v": 0,
                        "author.bills": 0,
                        "author.discount": 0,
                        "author.createdAt": 0,
                        "author.updatedAt": 0,
                        "author.Role": 0,
                        "category.parent": 0,
                        "category.__v": 0,
                        "createdAt": 0,
                        "__v": 0,
                        "updatedAt": 0
                    }
                }
            ])
            return res.status(200).json({
                data: {
                    status: 200,
                    success: true,
                    blogs
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async GetBlogById(req, res, next) {
        try {
            return res.status(200).json({
                status: 200,
                data: {
                    blogs: []
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async EditBlog(req, res, next) {
        try {
            return res.status(200).json({
                status: 200,
                data: {
                    blogs: []
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async EditBlog(req, res, next) {
        try {
            return res.status(200).json({
                status: 200,
                data: {
                    blogs: []
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async RemoveBlog(req, res, next) {
        try {
            return res.status(200).json({
                status: 200,
                data: {
                    blogs: []
                }
            })
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports = {
    AdminBlogsController: new BlogController(),
}
