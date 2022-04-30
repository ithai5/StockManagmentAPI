import { Router } from "express";
import { authPlayersWallet } from "../middlewares/authorization/auth.middleware";

export const orderRoutes = Router();

/**
 * @swagger
 * /order/trade/{walletId}:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags: [order]
 *    parameters:
 *        - in: path
 *          name: walletId
 *          type: string
 *          required: true
 *          description: id of the wallet
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/OrderRequest'
 *
 */
orderRoutes.post("/trade/:walletId", authPlayersWallet, (req, res) => {
  /*
  const { ticker,amount } = req.body;
  const walletId = req.params.walletId;
*/
  res.send({ message: "hello world" });
});
