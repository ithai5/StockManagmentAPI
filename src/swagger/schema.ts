/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    SignupRequest:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - phone
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          description: user full name
 *        email:
 *          type: string
 *          description: email address for login in
 *        phone:
 *          type: string
 *          description: phone number to reach the user
 *        password:
 *          type: string
 *          description: user password, will be encrypted
 *      example:
 *        email: user@example.com
 *        password: "123456789"
 *        phone: "004531000000"
 *        name: finnhubService user
 *    LoginResponse:
 *      type: object
 *      properties:
 *        authorize:
 *          type: boolean
 *          description: whether the player is successfully logged-in
 *    LoginRequest:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: a unique email address that the player is signing into with
 *        password:
 *          type: string
 *          description: a password that encrypted into the DB
 *      example:
 *        email: test@gmail.com
 *        password: 123456
 *    PlayerDto:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - playerId
 *      properties:
 *        email:
 *          type: string
 *          description: a unique email address that the player is signing into with
 *        password:
 *          type: string
 *          description: a password that encrypted into the DB
 *        playerId:
 *          type: number
 *          description: auto increment number from the DB
 *        phone:
 *          type: string
 *          description: player phone number
 *        name:
 *          type: string
 *          description: the name of the player
 *      example:
 *        playerId: 100
 *        name: John Doe
 *        email: finnhubService@example.com
 *        phone: 3131313131
 *        password: abcd1234xyz!
 *
 * */
