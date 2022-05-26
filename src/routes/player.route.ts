import { Router } from "express";
import { getAllWalletsForPlayer } from "../sevices/player.service";

export const playerRoutes = Router();

/**
 * @swagger
 * /player/wallets:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: get all wallets for player signed in
 *    tags: [player]
 *    responses:
 *      401:
 *        description: The player failed to login
 *      200:
 *        description: The player is logged in and has wallets associated with their account
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PlayerWalletResponse'
 */
playerRoutes.get("/wallets", (req, res) => {
  getAllWalletsForPlayer(req.body.playerId)
    .then((data) => {
      if (data) {
        res.json({ playerWallets: data });
      } else {
        res.status(400).send({ error: 404, message: "No wallets found" });
      }
    })
    .catch((error: Error) => {
      console.log("Error in player routes: ", error);
    });
});
