/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   time
 *                  -   type
 *              properties:
 *                  courseID:
 *                      type: string
 *                      example: 62dbe5c11e3ca9a3b811dc65
 *                  chapterID:
 *                      type: string
 *                      example: 62e194c5b9df5a347185cfd3
 *                  title:
 *                      type: string
 *                      example: Episode's title
 *                  text:
 *                      type: string
 *                      example: Description about this episode
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                      description: select episode type (unlock or lock) 
 *                  time:
 *                      type: string
 *                      description: test
 *                      example: 00:12:23
 */

/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags: [Episode(Admin-Panel)]
 *          summary: Adds an episode to a chater
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#components/schemas/AddEpisode'
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/AddEpisode'
 *          responses:
 *              200:
 *                  description: SUCCESS
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
 */