
import { wallet } from "../../../prisma/mongodb/client";
import { prismaMongodb } from "../../database-connection/mongodb.database-connection";
import { OrderActionDetails, walletStockActionType } from "../../database-service/mongodb/order.mongodb.service";
import { OrderDetail } from "../../models/dto/order-detail.dto";
import { OrderRequest } from "../../models/order-request";


export interface InterfaceOrderMongodbRepository {
  placeOrder: (orderRequest: OrderRequest, currentPrice: number, orderActionDetails: OrderActionDetails) 
    => Promise<OrderDetail | null>
}

export const OrderMongodbRepository: InterfaceOrderMongodbRepository = {
  placeOrder: async function (
    orderRequest: OrderRequest, 
    currentPrice: number, 
    orderActionDetails: OrderActionDetails
  ): Promise<OrderDetail | null> {

    const orderDate = new Date(new Date().toUTCString())

    let updatedWallet: wallet | null;
    if(orderActionDetails.action === walletStockActionType.CREATE){
      // CREATE
      updatedWallet = await placeOrderWalletStocksCreate(orderRequest, currentPrice, orderActionDetails, orderDate);
    } else if (orderActionDetails.action === walletStockActionType.UPDATE) {
      // UPDATE
      updatedWallet = await placeOrderWalletStocksUpdate(orderRequest, currentPrice, orderActionDetails, orderDate);
    } else { 
      // DELETE
      updatedWallet = await placeOrderWalletStocksDelete(orderRequest, currentPrice, orderActionDetails, orderDate);
    }

    // Theoretically works to find order by the date but didn't work so added check below and print warning
    const orderFromWallet = updatedWallet?.orders[updatedWallet.orders.length - 1];
    
    if(orderDate.getTime() !== orderFromWallet?.date.getTime()){
      console.log("WARN: Dates don't match, might've fetched the wrong order!");
    }

    return orderFromWallet ? {
      stockTicker: orderFromWallet.stockTicker,
      amount: orderFromWallet.stockShares,
      date: orderFromWallet.date,
      pricePerStock: orderFromWallet?.stockPrice,
      balanceRemaining: updatedWallet?.balance
    } : null;
  }
}

const placeOrderWalletStocksCreate = async (
  orderRequest: OrderRequest,
  currentPrice: number,
  orderActionDetails: OrderActionDetails,
  orderDate: Date
): Promise<wallet | null> => {
  return prismaMongodb.wallet.update({
    where: {
      walletId: orderRequest.walletId,
    },
    data: {
      balance: orderActionDetails.updatedBalance,
      orders: {
        push: [
          {
            stockTicker: orderRequest.ticker,
            stockPrice: currentPrice,
            stockShares: orderRequest.amount,
            date: orderDate,
            type: orderRequest.orderType
          }
        ]
      },
      stocks: {
        push: [
          {
            stockTicker: orderRequest.ticker,
            stockShares: orderRequest.amount,
            avgPrice: currentPrice
          }
        ]
      }
    }
  });
}

const placeOrderWalletStocksUpdate = async (
  orderRequest: OrderRequest,
  currentPrice: number,
  orderActionDetails: OrderActionDetails,
  orderDate: Date
): Promise<wallet | null> => {
  return prismaMongodb.wallet.update({
    where: {
      walletId: orderRequest.walletId,
    },
    data: {
      balance: orderActionDetails.updatedBalance,
      orders: {
        push: [
          {
            stockTicker: orderRequest.ticker,
            stockPrice: currentPrice,
            stockShares: orderRequest.amount,
            date: orderDate,
            type: orderRequest.orderType
          }
        ]
      },
      stocks: {
        updateMany: {
          where: {
            stockTicker: orderRequest.ticker
          },
          data: {
            avgPrice: orderActionDetails.avgBuyPrice,
            stockShares: orderActionDetails.totalShares
          }
        }
      }
    }
  });
}

const placeOrderWalletStocksDelete = async (
  orderRequest: OrderRequest,
  currentPrice: number,
  orderActionDetails: OrderActionDetails,
  orderDate: Date
): Promise<wallet | null> => {
  return prismaMongodb.wallet.update({
    where: {
      walletId: orderRequest.walletId,
    },
    data: {
      balance: orderActionDetails.updatedBalance,
      orders: {
        push: [
          {
            stockTicker: orderRequest.ticker,
            stockPrice: currentPrice,
            stockShares: orderRequest.amount,
            date: orderDate,
            type: orderRequest.orderType
          }
        ]
      },
      stocks: {
        deleteMany: {
          where: {
            stockTicker: orderRequest.ticker
          }
        }
      }
    }
  });
}
