const { PermissionsController } = require("../../http/controllers/RBAC/permissions.controller");
const { MongoDbObjectIdValidator } = require("../../http/validators/public");
const { AddPermissionValidator } = require("../../http/validators/RBAC/permissions.schema");

const router = require("express").Router();

router.get("/list", PermissionsController.GetALlPermissions)
router.post("/add", AddPermissionValidator(), PermissionsController.AddPemissions)
router.patch("/update/:id", MongoDbObjectIdValidator(), PermissionsController.UpdatePermissions)
router.delete("/remove/:field", PermissionsController.RemovePermissions)

module.exports = {
    AdminPermissionsRouter: router,
}
