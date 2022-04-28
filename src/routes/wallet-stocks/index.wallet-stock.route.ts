import { Router } from "express";
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
 walletStockRoutes.get("/:walletId", (req, res) => {
  if(isNumberRegex(req.params.walletId)){
    const walletId: number = +req.params.walletId;
    getWalletStocks(walletId)
      .then((data) => {
        res.json({walletStocks: data});
      })
      .catch((error: Error) => {
        throw error;
      });
  } else {
    res.send({error: 'Id is not a number'});
  }
});