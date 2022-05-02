import { InterfaceOrderRepository } from "../interface-order.repository";
import {OrderRequest} from "../../models/order-request";
import {prismaMySql} from "../../database-connection/mysql.database-connection";
import {Prisma} from "@prisma/client";

export const OrderMysqlRepository: InterfaceOrderRepository = {
  placeOrder(orderRequest: OrderRequest, currentPrice: number ) {
      prismaMySql.$executeRaw(Prisma.sql`CALL safe_order_transaction (
                          ${orderRequest.orderType},
                          ${orderRequest.ticker},
                          ${orderRequest.walletId},
                          ${orderRequest.amount},
                          ${currentPrice})`)
  }
};
