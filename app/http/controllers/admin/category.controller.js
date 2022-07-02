const { CategoryModel } = require("../../../models/categories.model");
const createError = require("http-errors");

const Controller = require("../controller");
const { CreateCategoryValidation } = require("../../validators/admin/category.schema");

class CategoryController extends Controller {
    async AddCategory(req, res, next) {
        try {
            await CreateCategoryValidation.validateAsync(req.body)
            const { title, parent } = req.body;
            const existCheck = await this.CheckCategoryExistence(title);
            if (existCheck) throw { status: 400, success: false, message: "Category already exists! 🗿"}
            const createResult = await CategoryModel.create({ title, parent })
            if (!createResult) throw { status: createError.InternalServerError(), success: false, message: "Category was not created 🥲"}
            return res.status(201).json({
                status: 201,
                success: true,
                message: "Category was successfully 🎉✨"
            })
        } catch (error) {
            next(error);
        }
    }

    async CheckCategoryExistence(title) {
        return !!await CategoryModel.findOne({title});
    }

    EditCategory(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    RemoveCategory(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    GetAllCategories(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    GetCategoryById(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    GetAllParents(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    
    GetChildrenOfParents(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    CategoryController: new CategoryController(),
}
