import { switchSelectDatabaseService } from "./repository.service";
import { currentDatabase } from "../global/database-control";
import { OrderRequest } from "../models/order-request";
import { getStock } from "./stock.service";

const { Order } = switchSelectDatabaseService(currentDatabase);

export const placeOrderForWallet = async (order: OrderRequest) => {
  try {
    /*get stock value*/
    const currentPrice = await getStock(order.ticker);

    return currentPrice?.currentPrice
      ? await Order.createOrder(order, currentPrice.currentPrice)
      : null;
  } catch (error) {
    console.log("Error placing order ", error);
    return null;
  }
};
