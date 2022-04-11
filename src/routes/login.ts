import { Request } from "express";
import { LoginRequest } from "../models/loginRequest";
import { loginAuthentication } from "../sevices/authentication";
import { authMiddleware, prepareJwt } from "../auth/middleware/authMiddleware";
import { Router } from "express";

export const loginRouter = Router();

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Login end point to Stock Management
 *    tags: [Login]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginRequest'
 *    responses:
 *      401:
 *        description: The player failed to login
 *      200:
 *        description: The player login successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 *
 */
loginRouter.post("/", (req: Request<{}, {}, LoginRequest>, res) => {
  loginAuthentication(req.body.email, req.body.password)
    .then((response) => {
      res.json({ authorized: true, jwt: response });
    })
    .catch((error: Error) => {
      res.status(401);
      res.send({ error: error.message });
    });
});

/**
 * @swagger
 * /login/authorized:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: checks if player jwt is authorized
 *    tags: [Login]
 *    responses:
 *      401:
 *        description: The player failed to login
 *      200:
 *        description: The player login successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginResponse'
 */
loginRouter.get("/authorized", authMiddleware, (req, res) => {
  res.send({
    authorized: true,
    jwt: prepareJwt(req.header("authorization")!!),
  });
});
