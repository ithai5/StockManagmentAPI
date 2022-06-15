import { prismaMySql } from "../../database-connection/mysql.database-connection";
import {
  WalletStockValue,
  walletStockValueSelect,
} from "../../models/dto/wallet.dto";
import { convertUUIDToBin } from "../../utils/uuid-management";
import { InterfaceWalletStockRepository } from "../interface-wallet-stock.repository";

export const WalletStockMysqlRepository: InterfaceWalletStockRepository = {
  async getWalletStocks(walletId) {
    const queryResult = await prismaMySql.walletHasStock.findMany({
      where: {
        fkWalletId: convertUUIDToBin(walletId),
      },
      select: walletStockValueSelect,
    });
    return queryResult.map((result) => {
      const stockValue: WalletStockValue = {
        stockTicker: result.fkStockTicker,
        stockShares: result.stockShares,
        avgPrice: result.avgPrice,
      };
      return stockValue;
    });
  },
  async getWalletStocksWithStockTicker(
    walletId: string,
    stockTicker: string
  ): Promise<WalletStockValue | null> {
    const queryResult = await prismaMySql.walletHasStock.findMany({
      where: {
        fkWalletId: convertUUIDToBin(walletId),
      },
      select: walletStockValueSelect,
    });

    const walletStock = queryResult.find(
      (e) => e.fkStockTicker === stockTicker
    );

    return walletStock
      ? {
          stockTicker: walletStock.fkStockTicker,
          stockShares: walletStock.stockShares,
          avgPrice: walletStock.avgPrice,
        }
      : null;
  },
};
