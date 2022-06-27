const { AuthSchema } = require("../../validators/user/auth.schema");
const Controller = require("../controller");

class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            const result = await AuthSchema.validateAsync(req.body);
            return res.status(200).send("Hello")
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    HomeController: new HomeController(),
}
