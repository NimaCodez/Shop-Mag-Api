const Controller = require("../controller");

class BlogController extends Controller {
    async CreateBlog(req, res, next) {
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
    async GetAllBlogs(req, res, next) {
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
