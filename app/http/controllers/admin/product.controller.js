const createHttpError = require("http-errors");
const { ProductModel } = require("../../../models/product.model");
const { DeleteFileInPublic } = require("../../../utils/functions");
const { CreateProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");

class ProductController extends Controller {
    async AddProduct(req, res, next) {
        try {
            const productCreateBody = await CreateProductSchema.validateAsync(req.body);
            const { title, short_text, text, category, count, price, discount, type, tags, width, height, length, weight } = req.body;
            req.body.image = path.join(productCreateBody.fileUploadPath, req.fileName).replace(/\\/gi, "/")
            const image = req.body.image;
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
            console.log(feture);
            const product = await ProductModel.create({
                title, short_text, text, category, count, price, type, tags, discount, image, feture, supplier
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
    CheckFetures({ width, height, length, weight }) {
        console.log(
            width, height, length, weight
        );

        return feture;
    }
    async GetAllProducts(req, res, next) {
        try {
            const products = await ProductModel.find({});
            return res.status(200).json({
                products
            })
        } catch (error) {
            next(error)
        }
    }
    GetProductById(req, res, next) {
        try {

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
    RemoveProduct(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    ProductController: new ProductController()
}
