const DevRoutes = require('express').Router();
const bcrypt = require('bcrypt');
const { GenerateRandomNumber } = require('../utils/functions');

/**
 * @swagger
 *  tags: 
 *      name: DeveloperRoutes
 *      description: Back-door for developers
 */
/**
 * @swagger
 *  /dev/hash-password/{password}:
 *      get:
 *          tags: [DeveloperRoutes]
 *          summary: generates a hash of given password
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: password
 *                  required: true
 *          responses:
 *              200:
 *                 description: success
 */
DevRoutes.get("/hash-password/:password", (req, res, next) => {
    const { password } = req.params;
    const salt = bcrypt.genSaltSync(11);
    return res.send(bcrypt.hashSync(password, salt))
})

/**
 * @swagger
 *  /dev/random-number:
 *      get:
 *          tags: [DeveloperRoutes]
 *          summary: generates a hash of given password
 *          responses:
 *              200:
 *                  description: success
 */
DevRoutes.get("/random-number", (req, res, next) => {
    return res.send(GenerateRandomNumber().toString());
})

module.exports = {
    DevRoutes
}
