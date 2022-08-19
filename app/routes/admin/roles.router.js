const { RoleController } = require("../../http/controllers/RBAC/roles.controller");
const { StringToArray } = require("../../http/middlewares/StringToArray");
const { validationErrorMapper } = require("../../http/middlewares/ValidationErrorMapper");
const { MongoDbObjectIdValidator } = require("../../http/validators/public");
const { AddRoleValidationSchema, UpdateRoleValidationSchema } = require("../../http/validators/RBAC/roles.schema");

const router = require("express").Router();

router.get("/list", RoleController.GetAllRoles)
router.post("/add", StringToArray("permission"), AddRoleValidationSchema(), validationErrorMapper, RoleController.AddRole)
router.patch("/update/:id", StringToArray("permission"), UpdateRoleValidationSchema(), validationErrorMapper, RoleController.UpdatRole)
router.delete("/remove/:field", MongoDbObjectIdValidator(), validationErrorMapper, RoleController.RemoveRole)

module.exports = {
    AdminRolesRouter: router
}
