import { OrderDetail } from "../models/dto/order-detail.dto";
import { OrderRequest } from "../models/order-request";

export interface InterfaceOrderRepository {
  createOrder: (orderRequest: OrderRequest) => Promise<OrderDetail>;
}
