const { RoleController } = require("../../http/controllers/RBAC/roles.controller");
const { StringToArray } = require("../../http/middlewares/StringToArray");
const { validationErrorMapper } = require("../../http/middlewares/ValidationErrorMapper");
const { MongoDbObjectIdValidator } = require("../../http/validators/public");
const { AddRoleValidationSchema, UpdateRoleValidationSchema } = require("../../http/validators/RBAC/roles.schema");

const router = require("express").Router();

router.get("/list", RoleController.GetAllRoles)
router.post("/add", StringToArray("permissions"), AddRoleValidationSchema(), validationErrorMapper, RoleController.AddRole)
router.patch("/update/:id", StringToArray("permissions"), UpdateRoleValidationSchema(), validationErrorMapper, RoleController.UpdatRole)
router.delete("/remove/:id", MongoDbObjectIdValidator(), validationErrorMapper, RoleController.RemoveRole)

module.exports = {
    AdminRolesRouter: router
}
