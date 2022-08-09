const createHttpError = require("http-errors");
const { UserModel } = require("../../../models/user.model");
const Controller = require("../controller");

class UserController extends Controller {
    async GetAllUsers(req, res, next) {
        try {
            const Users = await UserModel.find({});
            if (!Users) return createHttpError.NotFound("No Users were found! ")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    Users
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserController: new UserController(),
}
