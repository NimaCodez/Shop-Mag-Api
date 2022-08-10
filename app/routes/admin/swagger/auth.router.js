
/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile code for authentication.
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: User's Phone number for SignUp/Login
 *                  code:
 *                      type: integer
 *                      description: The authentication code sent by system to user.
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: The Access Token From checkOTP part.
 */

/**
 * @swagger
 *  /user/getotp:
 *      post:
 *          summary: Generates Otp For User 
 *          tags: [AuthRoutes]
 *          description : Generate Otp for mobiles
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *          responses:
 *              200:
 *                  description: success
 *              404: 
 *                  description: not Found
 */

/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          summary: Otp Checking route
 *          tags: [AuthRoutes]
 *          description: Checks User's Otp Code and Phone Number
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *          responses:
 *              200:
 *                  description: OK
 *              400:
 *                  description: Bad Request
 *              404:
 *                  description: Not found
 *              401: 
 *                  description: UnAuthorized
 *              500:
 *                  description: Internal Server Error
 */

/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          summary: Refresh Token for user
 *          tags: [AuthRoutes]
 *          description: Refresh token generator for user to do Payment and ...
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *          responses: 
 *              200:
 *                  description: OK
 *              400:
 *                  description: Bad Request
 *              404:
 *                  description: Not found
 *              401: 
 *                  description: UnAuthorized
 *              500:
 *                  description: Internal Server Error
 */
