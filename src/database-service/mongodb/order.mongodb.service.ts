import { OrderDetail } from "../../models/dto/order-detail.dto";
import { WalletStockValue } from "../../models/dto/wallet.dto";
import { OrderRequest, OrderType } from "../../models/order-request";
import { OrderMongodbRepository } from "../../repositories/mongodb/order.mongodb.repository";
import { InterfaceOrderDatabaseService } from "../interface-order.database-service";
import { walletStockMongodbService } from "./wallet-stock.mongodb.service";
import { walletMongodbService } from "./wallet.mongodb.service";

/**
 * What kind of action we want to take for the stocks inside a wallet
 * - TODO: This could be moved elsewhere?
 */
export enum walletStockActionType {
  CREATE = "CREATE",
  DELETE = "DELETE",
  UPDATE = "UPDATE"
}

/**
 * Attributes we need for determening the action for placing an order specific to mongodb.
 * - TODO: Could be moved elsewhere
 */
export interface OrderActionDetails {
  action: walletStockActionType,
  avgBuyPrice: number,
  totalShares: number,
  updatedBalance: number,
}

export const orderMongodbService: InterfaceOrderDatabaseService = {
  createOrder: async (orderRequest: OrderRequest, currentPrice: number): Promise<OrderDetail | null> => {
    
    const walletBeforeOrder = await walletMongodbService.getWallet(orderRequest.walletId);
    if(!walletBeforeOrder){
      throw new Error("Could not get wallet before placing order");
    }

    // Get stocks in the wallet we're placing an order with
    const walletStock = await walletStockMongodbService.getWalletStocksWithStockTicker(orderRequest.walletId, orderRequest.ticker);

    // Validate balance, and determine the action we need to take 
    // ... in terms of the wallets stocks based on order and current wallet attributes
    const {
      action, 
      avgBuyPrice, 
      totalShares, 
      updatedBalance
    } = getPlaceOrderActionDetails(walletStock, orderRequest, currentPrice, walletBeforeOrder.balance);

    return OrderMongodbRepository.placeOrder(orderRequest, currentPrice, {action, avgBuyPrice, totalShares, updatedBalance});
  },
}

/**
 * [TEMPORARY]
 * - Messy filled with if else statements which could be broken up.
 * - TODO: Refactor this method
 * 
 * Currently this method calculates:
 * - Total shares,
 * - Balance
 * 
 * Based on the type of action: Selling or Buying.
 * It also checks to see if balance is valid for selling.
 */
const getPlaceOrderActionDetails = (walletStock: WalletStockValue | null, orderRequest: OrderRequest, currentPrice: number, walletBalance: number) => {
  
  let newBalance;
  
  if(walletStock){
    let walletStocksAction;
    let totalShares;

    const avgBuyPrice = ((walletStock.avgPrice * walletStock.stockShares)
                    + (currentPrice * orderRequest.amount))
                    / (walletStock.stockShares + orderRequest.amount);

    // -------------------- SELLING STOCKS -------------------- 
    if(orderRequest.orderType === OrderType.Sell){
      // Start by checking whether they're trying to sell more than they own:
      if(walletStock.stockShares < orderRequest.amount){
        throw new Error("Trying to sell more than you have, little rascal");
      }
      newBalance = walletBalance + (orderRequest.amount * currentPrice)
      
      // Set empty shares if we're selling all of it or deduct it
      if(walletStock.stockShares === orderRequest.amount){
        walletStocksAction = walletStockActionType.DELETE;
        totalShares = 0;
      } else {
        walletStocksAction = walletStockActionType.UPDATE;
        totalShares = walletStock.stockShares - orderRequest.amount;
      }

    } else {
      // -------------------- BUYING STOCKS -------------------- 
      // Start by checking if balance is sufficient:
      if(walletBalance < orderRequest.amount * currentPrice) {
        // Error is caught in general service console logging and returning null
          // Might want to be able to move the catch to the api so that we can return the correct error, go through the flow
        throw new Error("Balance insufficient");
      }

      walletStocksAction = walletStockActionType.UPDATE;
      totalShares = walletStock.stockShares + orderRequest.amount;
      newBalance = walletBalance - orderRequest.amount * currentPrice;
    }

    return {action: walletStocksAction, avgBuyPrice: avgBuyPrice, totalShares: totalShares, updatedBalance: newBalance};
  } else {
    newBalance = walletBalance - orderRequest.amount * currentPrice;
    return {action: walletStockActionType.CREATE, avgBuyPrice: 0, totalShares: orderRequest.amount, updatedBalance: newBalance};
  }
}