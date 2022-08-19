const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { PermissionModel } = require("../../../models/permissions");
const { DeleteInvalidPropertyInObject } = require("../../../utils/functions");
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
            const { id } = req.params;
            const data = req.body;
            const updateResult = await PermissionModel.updateOne({ _id: id }, {
                $set: data
            })
            if (updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("Permission was not updated")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Permission Was Updated Successfully 🎉✨🔥"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async RemovePermissions(req, res, next) {
        try {
            const { field } = req.params;
            const DeleteParameter = await this.FindPermissionByIdOrTitle(field);
            console.log(DeleteParameter)
            const removeResult = await PermissionModel.deleteOne(DeleteParameter)
            if (!removeResult.deletedCount) throw createHttpError.InternalServerError("Permission was not removed")
            return res.status(200).json({
                status: 200,
                success: true,
                data: {
                    message: "Permission was removed successfully! 🎉✨🔥"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async FindPermissionByIdOrTitle(field) {
        let FilterQuery;
        if (mongoose.isValidObjectId(field)) FilterQuery = { _id: field };
        else FilterQuery = { title: field };
        return FilterQuery;
    }

}

module.exports = {
    PermissionsController: new PermissionsController(),
}
