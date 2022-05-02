import { OrderRequest } from "../models/order-request";

export interface InterfaceOrderRepository {
  placeOrder: (orderRequest: OrderRequest, currentPrice:number)=> void
}
