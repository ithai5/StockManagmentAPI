import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { StockValue, StockValueSelect } from "../../models/dto/wallet.dto";
import { InterfaceWalletStockRepository } from "../interface-wallet-stock.repository";


export const WalletStockMysqlRepository: InterfaceWalletStockRepository = {
  async getWalletStocks(walletId) {
    const queryResult = await prismaMySql.walletHasStock.findMany({
      where: {
        fkWalletId: walletId,
      },
      select: StockValueSelect
    });
    return queryResult.map((result) => {
      const stockValue: StockValue = {
        stockTicker: result.fkStockTicker,
        stockShares: result.stockShares,
        avgPrice: result.avgPrice,
      };
      return stockValue;
    });
  },
}