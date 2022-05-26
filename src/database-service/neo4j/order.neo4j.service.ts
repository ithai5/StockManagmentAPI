import { InterfaceOrderDatabaseService } from "../interface-order.database-service";
import { OrderRequest, OrderType } from "../../models/order-request";
import { OrderDetail } from "../../models/dto/order-detail.dto";
import { walletNeo4jService } from "./wallet.neo4j.service";
import { walletStockNeo4jService } from "./wallet-stock.neo4j.service";
import { orderNeo4jRepository } from "../../repositories/neo4j/order.neo4j.repository";

export const orderNeo4jService: InterfaceOrderDatabaseService = {
  async createOrder(
    orderRequest: OrderRequest,
    currentPrice: number
  ): Promise<OrderDetail | null> {
    const { getWalletStocksWithStockTicker } = walletStockNeo4jService;
    const {
      createNewStockWalletRelation,
      updateExistStockWalletRelation,
      orderSellingStock,
      updateSellingStock,
    } = orderNeo4jRepository;
    const walletHasStock = await getWalletStocksWithStockTicker(
      orderRequest.walletId,
      orderRequest.ticker
    );
    const walletBalance = await walletNeo4jService.getWallet(
      orderRequest.walletId
    );
    switch (orderRequest.orderType) {
      case OrderType.Buy:
        if (walletBalance!.balance < currentPrice * orderRequest.amount)
          throw Error("wallet does not have enough money");
        if (walletHasStock === null) {
          await createNewStockWalletRelation(orderRequest, currentPrice);
          break;
        }
        await updateExistStockWalletRelation(
          orderRequest,
          (walletHasStock.avgPrice * walletHasStock.stockShares +
            orderRequest.amount * currentPrice) /
            (orderRequest.amount + walletHasStock.stockShares),
          walletBalance?.balance!
        );
        break;
      case OrderType.Sell:
        if (
          walletHasStock === null ||
          walletHasStock.stockShares < orderRequest.amount
        )
          throw Error("Wallet does not have requested stock amount");
        if (walletHasStock.stockShares === orderRequest.amount) {
          await orderSellingStock(
            orderRequest,
            walletHasStock.avgPrice * walletHasStock.avgPrice
          );
          break;
        } else await updateSellingStock(orderRequest, walletHasStock.avgPrice);
        break;
      default:
        throw Error("unknown order type");
    }
    const remainingWalletBalance = await walletNeo4jService.getWallet(
      orderRequest.walletId
    );
    return {
      stockTicker: orderRequest.ticker,
      amount: orderRequest.amount,
      pricePerStock: currentPrice,
      balanceRemaining: remainingWalletBalance?.balance,
      date: new Date(),
    };
  },
};

export interface StockHasWalletRelation {
  stockShares: number;
  avgPrice: number;
}
