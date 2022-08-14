/**
 * @swagger
 *  definitions:
 *      ListOfPermissions:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      permission:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of permission"
 *                                  description:
 *                                      type: string
 *                                      example: "desc of permission"
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Permission:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of permission
 *                  description:
 *                      type: string
 *                      description: the desc of permission
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Permission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of permission
 *                  description:
 *                      type: string
 *                      description: the desc of permission
 *                  permissions:
 *                      type: array
 *                      description: the permissionsID for permission
 */
/**
 * @swagger
 *  /admin/permission/list:
 *      get:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: get all Role      
 *          responses:
 *              200:
 *                  description: get all Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfRoles'
 * 
 */
/**
 * @swagger
 *  /admin/permission/add:
 *      post:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: create new Role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Role'
 *          
 *          responses:
 *              201:
 *                  description: created new Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */
/**
 * @swagger
 *  /admin/permission/update/{id}:
 *      patch:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: edit the Role
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Role'
 *          
 *          responses:
 *              200:
 *                  description: edited the Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */
/**
 * @swagger
 *  /admin/permission/remove/{field}:
 *      delete:
 *          tags: [RBAC(Admin-Panel)]
 *          summary: remove the Role
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true    
 *                  description: send title of permission or objectId of permission for remove that    
 *          responses:
 *              200:
 *                  description: removed the Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */