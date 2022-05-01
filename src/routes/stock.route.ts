import { Router } from "express";
import { getStock } from "../sevices/stock.service";

export const stockRoutes = Router();

/**
 * @swagger
 * /stock/{ticker}:
 *  get:
 *    summary: get stock price from db
 *    tags: [stock]
 *    parameters:
 *        - in: path
 *          name: ticker
 *          type: string
 *          required: true
 *          description: ticker symbol of the stock
 *    responses:
 *      404:
 *        description: stock ticker does not found
 *      200:
 *        description: stock ticker details
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StockTickerResponse'
 */
stockRoutes.get("/:ticker", (req, res) => {
  getStock(req.params.ticker)
    .then((response) => {
      res.send({ stock: response });
    })
    .catch((error) => {
      res.status(404);
      res.send(error);
    });
});
