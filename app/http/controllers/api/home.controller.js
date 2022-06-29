const Controller = require("../controller");

class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            return res.status(200).send("Index Page Store")
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    HomeController: new HomeController(),
}
