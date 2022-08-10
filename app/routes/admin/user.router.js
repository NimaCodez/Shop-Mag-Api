const router = require("express").Router();
const { UserController } = require("../../http/controllers/user/user.controller");

router.get("/all", UserController.GetAllUsers)
router.patch("/update-profile", UserController.UpdateUserProfile)

module.exports = {
    AdminUsersRoutes: router,
}
