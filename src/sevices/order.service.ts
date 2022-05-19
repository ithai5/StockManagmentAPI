import { switchSelectDatabaseService } from "./repository.service";
import { Databases } from "../global/database-control";
import { OrderRequest } from "../models/order-request";
import { getStock } from "./stock.service";

const { Order } = switchSelectDatabaseService(Databases.MySQL);

export const placeOrderForWallet = async (order: OrderRequest) => {
  const currentPrice = await getStock(order.ticker);
  /*get stock value*/
  return Order.createOrder(order, currentPrice.currentPrice!);
};
