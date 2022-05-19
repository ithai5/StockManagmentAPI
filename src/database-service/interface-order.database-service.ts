import { OrderRequest } from "../models/order-request";
import { OrderDetail } from "../models/dto/order-detail.dto";

export interface InterfaceOrderDatabaseService {
  createOrder: (
    orderRequest: OrderRequest,
    currentPrice: number
  ) => Promise<OrderDetail>;
}
