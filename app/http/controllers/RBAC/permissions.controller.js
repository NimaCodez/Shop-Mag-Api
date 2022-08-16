const createHttpError = require("http-errors");
const { PermissionModel } = require("../../../models/permissions");
const Controller = require("../controller");

class PermissionsController extends Controller {
    async GetALlPermissions(req, res, next) {
        const Permissions = await PermissionModel.find({});
        if (!Permissions) throw createHttpError.NotFound("No Permissions has been added yet")
        return res.status(200).json({
            status: 200,
            success: true,
            data: {
                Permissions
            }
        })
    }

    async AddPemissions(req, res, next) {
        try {
            const { title, description } = req.body;
            const AddPermissionResult = await PermissionModel.create({
                title,
                description
            })
            if (!AddPermissionResult) throw createHttpError.InternalServerError("Permission was not Added");
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Permission was Added! 🎉✨🔥"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async UpdatePermissions(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async RemovePermissions(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

}

module.exports = {
    PermissionsController: new PermissionsController(),
}
