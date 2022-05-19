import { InterfaceOrderDatabaseService } from "../interface-order.database-service";
import { OrderRequest } from "../../models/order-request";
import { OrderMysqlRepository } from "../../repositories/mysql/order.mysql.repository";
import { walletMysqlService } from "./wallet.mysql.service";

export const orderMysqlService: InterfaceOrderDatabaseService = {
  createOrder: async (orderRequest: OrderRequest, currentPrice: number) => {
    OrderMysqlRepository.placeOrder(orderRequest, currentPrice);
    const wallet = await walletMysqlService.getWallet(orderRequest.walletId);
    return {
      stockTicker: orderRequest.ticker,
      amount: orderRequest.amount,
      pricePerStock: currentPrice,
      date: new Date(),
      balanceRemaining: wallet.balance,
    };
  },
};
