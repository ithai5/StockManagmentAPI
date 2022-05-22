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
  "/:walletId", authPlayersWallet, 
  (req: Request, res: Response) => {
    if (isNumberRegex(req.params.walletId)) {
      const walletId: string = req.params.walletId;
      getWallet(walletId)
        .then((data) => {
					if(data){
						res.json({ wallet: data });
					} else {
						res.status(404).send({error: 404, message: "Wallet Not Found"});
					}
        })
        .catch((error: Error) => {
					res.status(400).send({error: 400, message: "Can not get wallet"});
          console.log("Error: ", error);
        });
    } else {
      res.send({ error: "Id is not a number" });
    }
  }
);
