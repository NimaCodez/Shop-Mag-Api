const createHttpError = require("http-errors");
const { ProductModel } = require("../../../models/product.model");
const { DeleteFileInPublic, ListOfImagesFromRequest } = require("../../../utils/functions");
const { CreateProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");
const { default: mongoose } = require("mongoose");
const { MongoIdValidator } = require("../../validators/public");

class ProductController extends Controller {
    async AddProduct(req, res, next) {
        try {
            const productCreateBody = await CreateProductSchema.validateAsync(req.body);
            const images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
            const { title, short_text, text, category, count, price, discount, type, tags, width, height, length, weight } = productCreateBody;
            const supplier = req.user._id;
            let feture = {}
            if (!width) feture.width = 0;
            feture.width = +width;
            if (!height) feture.height = 0;
            feture.height = +height;
            if (!length) feture.length = 0;
            feture.length = +length;
            if (!weight) feture.weight = 0;
            feture.weight = +weight;
            // const feture = await this.CheckFetures(req.body);
            const product = await ProductModel.create({
                title, short_text, text, category, count, price, type, tags, discount, images, feture, supplier
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
            const products = await this.FindAllProductsWithAggregate()
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

    EditProduct(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    
    async RemoveProduct(req, res, next) {
        try {
            const { id } = req.params;
            await this.FindProductById(id);
            const deleteResult = await ProductModel.deleteOne({ _id: id })
            if(deleteResult.deletedCount == 0) throw createHttpError.InternalServerError("Product was not deleted! 🐢")
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
            { $match : { _id: mongoose.Types.ObjectId(id) } },
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
        if (!product) throw createHttpError.NotFound("Product was not found! 🐢 ");
        return product;
    }

    async FindAllProductsWithAggregate() {
        const product = await ProductModel.aggregate([
            { $match : {} },
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
