import { InterfaceOrderRepository } from "../interface-order.repository";
import {OrderRequest, OrderType} from "../../models/order-request";
import {prismaMySql} from "../../database-connection/mysql.database-connection";
import {Prisma} from "@prisma/client";

export const OrderMysqlRepository: InterfaceOrderRepository = {
  async placeOrder(orderRequest: OrderRequest, currentPrice: number ) {
    const walletIdNumber: number = +orderRequest.walletId;
    await prismaMySql.$executeRaw(Prisma.sql`CALL safe_order_transaction (
                          ${orderRequest.orderType},
                          ${orderRequest.ticker},
                          ${walletIdNumber},
                          ${orderRequest.amount},
                          ${currentPrice});`);
    
    const latestOrder = await prismaMySql.order.findMany({
      where: {
        fkStockTicker: orderRequest.ticker,
        fkWalletId: +orderRequest.walletId,
      },
      orderBy: {
        orderId: 'desc',
      },
      take: 1,
      select: {
        fkWalletId: true,
        fkStockTicker: true,
        stockShares: true,
        type: true,
      }
    });
    if(!latestOrder){return null;}
    const orderTypeDB = latestOrder[0].type === OrderType.Buy ? OrderType.Buy : OrderType.Sell;
    return {
      orderType: orderTypeDB,
      walletId: latestOrder[0].fkWalletId!.toString(),
      ticker: latestOrder[0].fkStockTicker,
      amount: latestOrder[0].stockShares
    }
  }
};