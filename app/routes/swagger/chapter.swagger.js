/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required: 
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      example: 6279e994c1e47a98d0f356d3
 *                  title:
 *                      type: string
 *                      example: Chapter 1 - zh Js
 *                  text:
 *                      type: string
 *                      example: description for this chapter
 */

/**
 * @swagger
 *  /admin/chapter/add:
 *      put:
 *          tags: [Chapter(Admin-Panel)]
 *          summary: Create new chapter four a course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/AddChapter'
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: INTERNAL SERVER ERROR 
 */