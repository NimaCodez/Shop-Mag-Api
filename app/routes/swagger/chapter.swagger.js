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
 *  definitions:
 *      ChaptersOfCourseDefinition:
 *          type: object
 *          properties:
 *              status:
 *                  type: integer
 *                  example: 20x, 40x, 500
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: 6279e994c1e47a98d0f356d3
 *                              title:
 *                                  type: string
 *                                  exmaple: Course's title
 *                              chapters:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                  example: [{_id: '6279e994c1e47a98d0f356d3', title: "chapter's title", text: "chapter's text"}]
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
 *                          $ref: '#/components/schemas/AddChapter'
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: INTERNAL SERVER ERROR 
 */

/**
 * @swagger
 *  /admin/chapter/list/{chapterID}:
 *      get:
 *          tags: [Chapter(Admin-Panel)]
 *          summary: Create new chapter four a course
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: SUCCESS
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ChaptersOfCourseDefinition'
 */