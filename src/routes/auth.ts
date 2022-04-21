import { Request, Response, Router } from "express";
import { LoginRequest } from "../models/loginRequest";
import {
  loginAuthentication,
  prepareJwt,
  signupPlayer,
} from "../sevices/authentication";
import { authMiddleware } from "../middleware/authorization/authMiddleware";
import { SignupDto } from "../models/signupDto";

export const auth = Router();

/**
 * @swagger
 * /authorization/login:
 *  post:
 *    summary: Login end point to Stock Management
 *    tags: [authorization]
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

auth.post("/login", (req: Request<{}, {}, LoginRequest>, res) => {
  loginAuthentication(req.body.email, req.body.password)
    .then((response) => {
      res.cookie("access_token", response, { httpOnly: true });
      res.json({ authorized: true }); //need
    })
    .catch((error: Error) => {
      res.status(401);
      res.send({ error: error.message });
    });
});

/**
 * @swagger
 * /authorization/authorized:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: checks if player jwt is authorized
 *    tags: [authorization]
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

auth.get("/authorized", authMiddleware, (req, res) => {
  res.send({
    authorized: true,
    jwt: prepareJwt(req.header("authorization")!!),
  });
});

/**
 * @swagger
 * /authorization/signup:
 *  post:
 *    summary: signup new user
 *    tags: [authorization]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SignupRequest'
 *    responses:
 *      409:
 *        description: Fail to create new user
 *      201:
 *        description: New Player has been created successfully
 */

auth.post("/signup", (req: Request<never, never, SignupDto>, res: Response) => {
  signupPlayer(req.body)
    .then((response) => {
      console.log(response);
      res.status(201);
      res.send({ ...response, password: "************" });
    })
    .catch((error) => {
      console.log(error);
      res.status(409);
      res.send(error.message);
    });
});
