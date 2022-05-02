import {InterfaceOrderDatabaseService} from "../interface-order.database-service";
import {OrderRequest} from "../../models/order-request";
import {OrderMysqlRepository} from "../../repositories/mysql/order.mysql.repository";
import {stockMysqlService} from "./stock.mysql.service";
import {walletMysqlService} from "./wallet.mysql.service";

export const orderMysqlService: InterfaceOrderDatabaseService = {
    createOrder: async (orderRequest: OrderRequest) => {
        const stockValue = await stockMysqlService.getStock(orderRequest.ticker)
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