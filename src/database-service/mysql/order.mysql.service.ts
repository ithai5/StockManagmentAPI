import { InterfaceOrderDatabaseService } from "../interface-order.database-service";
import { OrderRequest } from "../../models/order-request";
import { OrderMysqlRepository } from "../../repositories/mysql/order.mysql.repository";
import { walletMysqlService } from "./wallet.mysql.service";

export const orderMysqlService: InterfaceOrderDatabaseService = {
  createOrder: async (orderRequest: OrderRequest, currentPrice: number) => {
    const orderCreated = await OrderMysqlRepository.placeOrder(
      orderRequest,
      currentPrice
    );
    if (!orderCreated) {
      return null;
    }
    const wallet = await walletMysqlService.getWallet(orderRequest.walletId);
    if (!wallet) {
      return null;
    }
    return {
      stockTicker: orderCreated.ticker,
      amount: orderCreated.amount,
      pricePerStock: currentPrice,
      date: new Date(),
      balanceRemaining: wallet.balance,
    };
  },
};
