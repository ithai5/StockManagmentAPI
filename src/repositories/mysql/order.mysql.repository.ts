import { InterfaceOrderRepository } from "../interface-order.repository";
import { OrderDetail } from "../../models/dto/order-detail.dto";
import { OrderRequest } from "../../models/order-request";

export const OrderMysqlRepository: InterfaceOrderRepository = {
  createOrder(_orderRequest: OrderRequest): Promise<OrderDetail> {
    return Promise.resolve({
      amount: 0,
      balanceRemaining: 0,
      date: new Date(),
      pricePerStock: 0,
      StockTicker: "abc",
    });
  },
};
