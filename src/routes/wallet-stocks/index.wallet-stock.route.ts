import { Router } from "express";
import { authPlayersWallet } from "../../middlewares/authorization/auth.middleware";
import { getWalletStocks } from "../../sevices/wallet-stock.service";
import { isNumberRegex } from "../../utils/input-checks";


export const walletStockRoutes = Router();

/**
 * @swagger
 * /wallet/stock/{walletId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get stocks in wallet with walletId
 *    tags: [stock]
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
 *        description: We get the stocks owned within the wallet
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/WalletStockResponse'
 */
 walletStockRoutes.get("/:walletId", authPlayersWallet, (req, res) => {
  const walletId: string = req.params.walletId;
  getWalletStocks(walletId)
    .then((data) => {
      if(data){
        res.json({walletStocks: data});
      } else {
        // TODO: Decide on the following comment:
        // Should perhaps just be sending empty data rather than an error!
        res.status(404).send({error: 404, message: "Wallets stocks not found"});
      }
    })
    .catch((error: Error) => {
      console.log("Error in wallet stocks route: ", error);
      res.status(400).send({error: 400, message: "Couldn't handle request for wallets stock"});
    });
  }
);