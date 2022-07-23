const { CategoryModel } = require("../../../models/categories.model");
const createError = require("http-errors");

const Controller = require("../controller");
const { CreateCategoryValidation } = require("../../validators/admin/category.schema");
const { MongoIdValidator } = require("../../validators/public");
const { default: mongoose } = require("mongoose");
const { id } = require("@hapi/joi/lib/base");

class CategoryController extends Controller {

    async AddCategory(req, res, next) {
        try {
            await CreateCategoryValidation.validateAsync(req.body)
            const { title, parent } = req.body;

            const existCheck = await this.CheckCategoryExistence(title);
            if (existCheck) throw { status: 400, success: false, message: "Category already exists! 🗿" }
            const createResult = await CategoryModel.create({ title, parent })
            if (!createResult) throw createError.InternalServerError("Category was not created 🥲");
            return res.status(201).json({
                status: 201,
                success: true,
                data: {
                    message: "Category was created successfully 🎉✨"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async CheckCategoryExistence(title) {
        return !!await CategoryModel.findOne({ title });
    }

    async CheckCategoryExistenceById(ID) {
        return !!await CategoryModel.findOne({ _id: ID });
    }

    async EditCategory(req, res, next) {
        try {
            await MongoIdValidator.validateAsync(req.params)
            const { id } = req.params;
            const data = { ...req.body };
            const findResult = await this.CheckCategoryExistenceById(id);
            if (!findResult) throw createError.NotFound("Category does not exist")
            const updateResult = await CategoryModel.updateOne({ _id: id }, { $set: data })
            if (updateResult.modifiedCount == 0) throw createError.BadRequest("Nothing was updated")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Category Edited Successfully! 🎉✨"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async RemoveCategory(req, res, next) {
        try {
            await MongoIdValidator.validateAsync(req.params);
            const { id } = req.params;
            const findResult = await this.CheckCategoryExistenceById(id);
            if (!findResult) throw createError.NotFound("Category does not exist")
            const deleteResult = await CategoryModel.deleteMany({
                $or: [
                    { _id: mongoose.Types.ObjectId(id) },
                    { parent: mongoose.Types.ObjectId(id) }
                ]
            });
            if (deleteResult.deletedCount == 0) throw { status: 500, success: false, message: "Category was not deleted from database" }
            return res.status(200).json({
                statius: 200,
                success: true,
                data: {
                    message: "Category was successfully deleted 🎉✨"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async GetCategoryById(req, res, next) {
        try {
            await MongoIdValidator.validateAsync(req.params);
            const { id } = req.params;
            const category = await CategoryModel.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children"
                    }
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0
                    }
                }
            ])
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async GetAllCategories(req, res, next) {
        try {
            // const categories = await CategoryModel.aggregate([
            //     {
            //         $graphLookup: {
            //             from: "categories",
            //             startWith: "$_id",
            //             connectFromField: "_id",
            //             connectToField: "parent",
            //             maxDepth: 9,
            //             depthField: "depth",
            //             as: "children"
            //         }
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             "children.__v": 0,
            //             "children.parent": 0
            //         }
            //     },
            //     {
            //         $match: {
            //             parent: undefined
            //         }
            //     }
            // ])
            const categories = await CategoryModel.find({ parent: undefined }, { __v: 0, id: 0 })
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async GetAllCategoriesWithoutPopulate(req, res, next) {
        try {
            const categories = await CategoryModel.aggregate([
                { $match: {} }, { $project: { __v: 0 } }
            ])
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async GetAllParents(req, res, next) {
        try {
            const parents = await CategoryModel.find({ parent: undefined }, { __v: 0 })
            if (!parents) throw createError.NotFound("No parent category was found")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    parents
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async GetChildrenOfParents(req, res, next) {
        try {
            await MongoIdValidator.validateAsync(req.params);
            const { id } = req.params;
            const children = await CategoryModel.find({ parent: id }, { __v: 0 });
            console.log(children);
            if (!children) throw { status: 404, success: false, message: "No children Category found for this parent" }
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    children
                }
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    CategoryController: new CategoryController(),
}