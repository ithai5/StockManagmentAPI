import { prismaMySql } from "../../database-connection/mysql.database-connection";
import {
  WalletStockValue,
  walletStockValueSelect,
} from "../../models/dto/wallet.dto";
import { InterfaceWalletStockRepository } from "../interface-wallet-stock.repository";

export const WalletStockMysqlRepository: InterfaceWalletStockRepository = {
  async getWalletStocks(walletId) {
		const walletIdNumber: number = +walletId;
    const queryResult = await prismaMySql.walletHasStock.findMany({
      where: {
        fkWalletId: walletIdNumber,
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
};
