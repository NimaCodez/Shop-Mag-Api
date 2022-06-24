const Controller = require("../controller");

class HomeController extends Controller{
    indexPage(req, res, next) {
        try {
            return res.status(200).send("Hello")
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    HomeController: new HomeController(),
}
