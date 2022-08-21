const router = require("express").Router();
const { UserController } = require("../../http/controllers/user/user.controller");
const { PermissionGuard } = require("../../http/middlewares/Permission.guard");
const { PERMISSIONS } = require("../../utils/constants");

router.get("/all", PermissionGuard([PERMISSIONS.ADMIN]), UserController.GetAllUsers)
router.patch("/update-profile", PermissionGuard([]), UserController.UpdateUserProfile)
router.get("/profile", PermissionGuard([]), UserController.UserProfile)

module.exports = {
    AdminUsersRoutes: router,
}
