import { Request, Response, Router } from "express";
import { getWallet } from "../sevices/wallet.service";
import { isNumberRegex } from "../utils/input-checks";
import { walletStockRoutes } from "./wallet-stocks/index.wallet-stock.route";
import { authPlayersWallet } from "../middlewares/authorization/auth.middleware";

export const walletRoutes = Router();

walletRoutes.use("/stock", walletStockRoutes);

/**
 * @swagger
 * /wallet/{walletId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get wallet with walletId
 *    tags: [wallet]
 *    parameters:
 *        - in: path
 *          name: walletId
 *          type: string
 *          required: true
 *          description: id of the wallet
 *    responses:
 *      401:
 *        description: The player failed to login
 *      200:
 *        description: The player is logged in and has wallets associated with their account
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WalletResponse'
 */
walletRoutes.get(
  "/:walletId",
  authPlayersWallet,
  (req: Request, res: Response) => {
    if (isNumberRegex(req.params.walletId)) {
      const walletId: number = +req.params.walletId;
      getWallet(walletId)
        .then((data) => {
          res.json({ wallet: data });
        })
        .catch((error: Error) => {
          throw error;
        });
    } else {
      res.send({ error: "Id is not a number" });
    }
  }
);
