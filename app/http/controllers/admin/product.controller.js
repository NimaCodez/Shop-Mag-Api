const { ProductModel } = require("../../../models/product.model");
const { CreateProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");

class ProductController extends Controller {
    async AddProduct(req, res, next) {
        try {
            const productCreateBody = await CreateProductSchema.validateAsync(req.body);
            return res.status(200).json({
                productCreateBody
            })
        } catch (error) {
            next(error)
        }
    }
    GetAllProducts(req, res, next) {
        try {
            const products = ProductModel.aggregate([
                { $match: {} }
            ])
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
