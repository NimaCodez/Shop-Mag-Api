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
 *                  -   video
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
 *                  video:
 *                      type: string
 *                      description: Episode video file
 *                      format: binary
 *          EditEpisode:
 *              type: object
 *              properties:
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
 *                  video:
 *                      type: string
 *                      description: Episode video file
 *                      format: binary
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
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#components/schemas/AddEpisode'
 *          responses:
 *              201:
 *                  description: SUCCESS
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/episode/remove/{episodeID}:
 *      delete:
 *          tags: [Episode(Admin-Panel)]
 *          summary: remove a video from a chapter
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  descriptoion: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/episode/update/{episodeID}:
 *      patch:
 *          tags: [Episode(Admin-Panel)]
 *          summary: Edit one episode in a chapter
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/EditEpisode'
 *          responses:
 *              200:
 *                  description: SUCCESS
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */