const createError = require('http-errors');
const { UserModel } = require('../../../../models/user.model');
const { EXPIRES_IN, USER_ROLE } = require('../../../../utils/constants');
const { GenerateRandomNumber } = require('../../../../utils/functions');
const { AuthSchema } = require('../../../validators/user/auth.schema');
const Controller = require('../../controller');

class UserAuthController extends Controller {
    async Login(req, res, next) {
        try {
            await AuthSchema.validateAsync(req.body);
            const { mobile } = req.body;
            const code = GenerateRandomNumber()
            const result = await this.saveUser(mobile, code);
            if(!result) throw createError.Unauthorized("You were not logged In")
            return res.status(200).json({
                status: 200,
                success: true,
                message: `Logged in successfully: Code: ${code}`,
                code,
                mobile
            })
        } catch (error) {
            next(createError.BadRequest(error.message));
        }
    }
    async CheckUserExistence(mobile) {
        const result = UserModel.findOne({mobile})
        return !!result
    }
    async saveUser(mobile, code) {
        let otp = {
            code,
            expiresIn: EXPIRES_IN
        }
        const result = this.CheckUserExistence(mobile)
        if(result) {
            return (await this.UpdateUser(mobile, {otp}))
        }
        return !!(await UserModel.create({
            mobile,
            otp,
            Role: [USER_ROLE]
        }))
    }
    async UpdateUser(mobile, updateBody = {}) {
        Object.keys(updateBody).forEach(key => {
            if(["", " ", "  ", ".", 0, -1, NaN, null, undefined, false, "0"].includes(key)) delete updateBody[key]
        })  
        const updateResult = await UserModel.updateOne({mobile}, {$set: updateBody})
        return !!updateResult.modifiedCount
    }
}

module.exports = {
    UserAuthController: new UserAuthController(),
}
