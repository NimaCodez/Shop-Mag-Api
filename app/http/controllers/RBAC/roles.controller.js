const createHttpError = require("http-errors");
const { RoleModel } = require("../../../models/roles.model");
const Controller = require("../controller");

class RoleController extends Controller {
    async GetAllRoles(req, res, next) {
        try {
            const user = req.user;
            const roles = await RoleModel.aggregate([
                {
                    $match: {},
                },
                {
                    $lookup: {
                        as: "permissionInfo",
                        from: "permissions",
                        localField: "permissions",
                        foreignField: "_id",
                    }
                }])
            if (!roles) throw createHttpError.NotFound("No Roles were found!")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    roles
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async AddRole(req, res, next) {
        try {
            const { title, permissions, description } = req.body;
            const AddRoleResult = await RoleModel.create({
                title, permissions: permissions ? permissions : null, description
            })
            if (!AddRoleResult) throw createHttpError.InternalServerError("Role was not added!")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Role Was Added Successfully! 🎉✨🔥"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async UpdatRole(req, res, next) {
        try {
            const { id: _id } = req.params;
            const BodyData = req.body;
            const UpdateRoleResult = await RoleModel.updateOne({ _id }, {
                $set: BodyData
            })
            if (UpdateRoleResult.modifiedCount == 0) throw createHttpError.InternalServerError("Role was not updated")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Role was updated successfully! 🎉✨🔥"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async RemoveRole(req, res, next) {
        try {
            const { field } = req.params;
            const deleteResult = await RoleModel.deleteOne({
                $or: [
                    { _id: field },
                    { title: field }
                ]
            })
            if (deleteResult.deletedCount == 0) throw createHttpError.InternalServerError("Role Was Not Deleted")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Role Was Removed Successfully! 🎉✨🔥"
                }
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    RoleController: new RoleController(),
}
