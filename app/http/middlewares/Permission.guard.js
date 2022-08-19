const createHttpError = require("http-errors");
const { RoleModel } = require("../../models/roles.model");

function CheckPermission(requiredPermissions = []) {
    return async function (req, res, next) {
        try {
            const user = await req.user;
            console.log(user.Role)
            RoleModel.findOne({})
            const role = await RoleModel.aggregate([
                {
                    $match: {
                        title: user.Role
                    },
                },
                {
                    $lookup: {
                        as: "result",
                        from: "permissions",
                        localField: "permissions",
                        foreignField: "_id",
                    }
                }
            ])
            console.log(role[0].result.map(item => item.title));
            const UserPermissions = role[0].result.map(item => item.title);
            console.log(UserPermissions)
            const HasPermission = requiredPermissions.every(permission => {
                return UserPermissions.includes(permission)
            })
            if (requiredPermissions.length == 0 || HasPermission) return next();
            throw createHttpError.Forbidden("you Don't have the right access to see this page! ")
        } catch (error) {
            next(error)
        }
    };
};

module.exports = {
    PermissionGuard: CheckPermission,
}
