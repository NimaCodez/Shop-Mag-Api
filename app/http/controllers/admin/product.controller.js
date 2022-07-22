const createHttpError = require("http-errors");
const { ProductModel } = require("../../../models/product.model");
const { DeleteFileInPublic, ListOfImagesFromRequest, CopyObject, SetFeatures, DeleteInvalidPropertyInObject } = require("../../../utils/functions");
const { CreateProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");
const { default: mongoose } = require("mongoose");
const { MongoIdValidator } = require("../../validators/public");
const ProductBlackList = {
    BOOKMARKS: "bookmarks",
    LIKES: "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    LENGTH: "length",
    HEIGHT: "height",
    COLORS: "colors"
}
Object.freeze(ProductBlackList)

class ProductController extends Controller {
    async AddProduct(req, res, next) {
        try {
            const productCreateBody = await CreateProductSchema.validateAsync(req.body);
            const images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
            const { title, short_text, text, category, count, price, discount, type, tags } = productCreateBody;
            const supplier = req.user._id;
            let features = SetFeatures(req.body)
            const product = await ProductModel.create({
                title, short_text, text, category, count, price, type, tags, discount, images, features, supplier
            })
            if (!product) throw createHttpError.InternalServerError("Product was not Added")
            return res.status(200).json({
                product
            })
        } catch (error) {
            DeleteFileInPublic(req.body.image)
            next(error)
        }
    }

    async GetAllProducts(req, res, next) {
        try {
            let products;
            let search = req?.query?.search || "";
            if (search) {
                products = await ProductModel.find({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                })
            } else {
                products = await this.FindAllProductsWithAggregate()
            }
            return res.status(200).json({
                products
            })
        } catch (error) {
            next(error)
        }
    }

    async GetProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.FindProductById(id);
            if (!product) throw createHttpError.NotFound("No products with was found! 🐢")
            return res.status(200).json({
                product
            })
        } catch (error) {
            next(error)
        }
    }

    async EditProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.FindProductById(id);
            const data = CopyObject(req.body)
            data.images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
            data.features = SetFeatures(req.body);
            let BlackListdata = Object.values(ProductBlackList)
            DeleteInvalidPropertyInObject(data, BlackListdata)
            const UpdateResult = await ProductModel.updateOne({ _id : product[0]._id }, { $set: data });
            if (UpdateResult.modifiedCount == 0) throw createHttpError.InternalServerError("Internal Server Error, Update was not done")
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Product successfully updated 🎉✨ "
            })
        } catch (error) {
            next(error)
        }
    }

    async editProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.findProductById(id)
            const data = CopyObject(req.body);
            data.images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
            data.features = SetFeatures(req.body)
            let blackListFields = Object.values(ProductBlackList);
            DeleteInvalidPropertyInObject(data, blackListFields)
            const updateProductResult = await ProductModel.updateOne({ _id: product._id }, { $set: data })
            if (updateProductResult.modifiedCount == 0) throw { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "خطای داخلی" }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "به روز رسانی باموفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async RemoveProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.FindProductById(id);
            const deleteResult = await ProductModel.deleteOne({ _id: product[0]._id })
            if (deleteResult.deletedCount == 0) throw createHttpError.InternalServerError("Product was not deleted! 🐢")
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Product was deleted successfully 🎉✨"
            })
        } catch (error) {
            next(error)
        }
    }

    async FindProductById(productId) {
        const { id } = await MongoIdValidator.validateAsync({ id: productId });
        const product = await ProductModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "supplier",
                    foreignField: "_id",
                    as: "supplier"
                }
            },
            {
                $project: {
                    __v: 0,
                    "supplier.__v": 0,
                    "supplier.otp": 0,
                    "supplier.bills": 0,
                    "supplier.createdAt": 0,
                    "supplier.updatedAt": 0,
                    "supplier.Role": 0,
                    "supplier.discount": 0,
                    "supplier._id": 0
                }
            }
        ]);
        if (!product) return createHttpError.NotFound("Product was not found! 🐢 ");
        return product;
    }

    async FindAllProductsWithAggregate() {
        const product = await ProductModel.aggregate([
            { $match: {} },
            {
                $lookup: {
                    from: "users",
                    localField: "supplier",
                    foreignField: "_id",
                    as: "supplier"
                }
            },
            {
                $project: {
                    __v: 0,
                    "supplier.__v": 0,
                    "supplier.otp": 0,
                    "supplier.bills": 0,
                    "supplier.createdAt": 0,
                    "supplier.updatedAt": 0,
                    "supplier.Role": 0,
                    "supplier.discount": 0,
                    "supplier._id": 0
                }
            }
        ]);
        if (!product) throw createHttpError.NotFound("Products were not found! 🐢 ");
        return product;
    }
}

module.exports = {
    ProductController: new ProductController()
}
