import { InterfaceOrderRepository } from "../interface-order.repository";
import { OrderDetail } from "../../models/dto/order-detail.dto";
import { OrderRequest } from "../../models/order-request";
import {prismaMySql} from "../../database-connection/mysql.database-connection";
import {Prisma} from "@prisma/client";

export const OrderMysqlRepository: InterfaceOrderRepository = {
  async createOrder(orderRequest: OrderRequest): Promise<OrderDetail> {
      const stock = await prismaMySql.stock.findUnique({where:
              {stockTicker: orderRequest.ticker}
      })
      await prismaMySql.$executeRaw(Prisma.sql`CALL safe_order_transaction (
                          ${orderRequest.orderType}, 
                          ${orderRequest.ticker}, 
                          ${orderRequest.walletId}, 
                          ${orderRequest.amount},
                          ${stock?.currentPrice})`)
      const wallet = await prismaMySql.wallet.findUnique({where: {walletId: orderRequest.walletId}})
      return {
        stockTicker: orderRequest.ticker,
        amount: orderRequest.amount,
        pricePerStock: stock?.currentPrice,
        date: new Date(),
        balanceRemaining: wallet?.balance
      }
  }
};
