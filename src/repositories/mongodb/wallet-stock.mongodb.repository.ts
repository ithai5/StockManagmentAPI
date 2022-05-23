import { prismaMongodb } from "../../database-connection/mongodb.database-connection";
import { WalletStockValue } from "../../models/dto/wallet.dto";
import { InterfaceWalletStockRepository } from "../interface-wallet-stock.repository";

export const WalletStockMongodbRepository: InterfaceWalletStockRepository = {
  async getWalletStocks(walletId: string): Promise<WalletStockValue[] | null> {
    const queryResult1 = await prismaMongodb.wallet.findUnique({
      where: {
        walletId: walletId
      },
      select: {
        stocks: {
          select: {
            stockShares: true,
            stockTicker: true,
            avgPrice: true,
          }
        }
      }
    });

    return queryResult1?.stocks ? queryResult1.stocks : null;
  },
  async getWalletStocksWithStockTicker(walletId: string, stockTicker: string): Promise<WalletStockValue | null> {
    const queryResult1 = await prismaMongodb.wallet.findUnique({
      where: {
        walletId: walletId
      },
      select: {
        stocks: {
          select: {
            stockShares: true,
            stockTicker: true,
            avgPrice: true,
          }
        }
      }
    });
    
    const walletStock = queryResult1?.stocks.find(e => e.stockTicker === stockTicker);
    return walletStock ? walletStock : null;
  }
};
