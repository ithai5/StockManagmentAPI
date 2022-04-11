import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swagger/swagger";
import cors from "cors";
import { loginRouter } from "./routes/login";

const PORT = process.env.APP_PORT || 4200;

const app = express();
app.use(express.json());
app.use("/login", loginRouter);
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/", (req, res) => {
  res.send({ message: "hello world" });
});

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    LoginResponse:
 *      type: object
 *      properties:
 *        authorize:
 *          type: boolean
 *          description: whether the player is successfully logged-in
 *        jwt:
 *          type: string
 *          description: Json web token that contain the player id
 *
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
 *        password: test
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
 *        email: test@example.com
 *        phone: 3131313131
 *        password: abcd1234xyz!
 * */

app.listen(PORT, () => {
  console.log("Application is running on port: ", PORT);
});
