const createHttpError = require("http-errors");
const { UserModel } = require("../../../models/user.model");
const { DeleteInvalidPropertyInObject } = require("../../../utils/functions");
const Controller = require("../controller");

class UserController extends Controller {
    
    async GetAllUsers(req, res, next) {
        try {
            const { search } = req.query;
            const databaseQuery = {};
            let Users;
            if (search) {
                databaseQuery["$text"] = { $search: search }
                Users = await UserModel.find (databaseQuery)
                if (!Users || Users.length == 0) {
                    throw createHttpError.NotFound("No Users were found! ")
                }
            }
            Users = await UserModel.find({});
            if (!Users) throw createHttpError.NotFound("No Users were found! ")
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

    async UpdateUserProfile(req, res, next) {
        try {
            const userID = req.user._id;
            const data = req.body;
            const BlackList = ["mobile", "otp", "bills", "discount", "Role", "Courses" ]
            DeleteInvalidPropertyInObject(data, BlackList)
            const UpdateResult = await UserModel.updateOne({ _id: userID }, { $set: data })
            if (UpdateResult.modifiedCount == 0) throw createHttpError.InternalServerError("Update was not done! ")
            return res.status(200).json ({
                status: 200,
                success: true,
                data: {
                    message: "User was updated successfully! 🎉✨🔥"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async UserProfile(req, res, next){
        try {
            const user = req.user;
            //bill, courses, discount, 
            // console.log(await getBasketOfUser(user._id));
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    user
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
