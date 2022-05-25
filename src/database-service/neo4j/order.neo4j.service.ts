import { InterfaceOrderDatabaseService } from "../interface-order.database-service";
import { OrderRequest } from "../../models/order-request";
import { OrderDetail } from "../../models/dto/order-detail.dto";

export const orderNeo4jService: InterfaceOrderDatabaseService = {
  createOrder(
    orderRequest: OrderRequest,
    currentPrice: number
  ): Promise<OrderDetail | null> {
    throw Error("not implemented");
  },
};