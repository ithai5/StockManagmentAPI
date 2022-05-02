import {OrderRequest} from "../models/order-request";
import {OrderDetail} from "../models/dto/order-detail.dto";
import {stockMysqlService} from "./interface-stock-database.service";
import {walletMysqlService} from "./interface-wallet-database.service";
import {OrderMysqlRepository} from "../repositories/mysql/order.mysql.repository";

export interface InterfaceOrderDatabaseService {
    createOrder: (orderRequest: OrderRequest) => Promise<OrderDetail>
}

export const orderMysqlService: InterfaceOrderDatabaseService = {
     createOrder: async(orderRequest: OrderRequest) => {
        const stockValue =await stockMysqlService.getStock(orderRequest.ticker)
         /*TODO: ithai 2.5.2022- sync the price with current price in the stock market */
         if (stockValue.currentPrice === null) throw Error("stock price is not updated")
         OrderMysqlRepository.placeOrder(orderRequest, stockValue.currentPrice)
         const wallet = await walletMysqlService.getWallet(orderRequest.walletId)
         return {
             stockTicker: orderRequest.ticker,
             amount: orderRequest.amount,
             pricePerStock: stockValue.currentPrice,
             date: new Date(),
             balanceRemaining: wallet.balance
         }
     }
}