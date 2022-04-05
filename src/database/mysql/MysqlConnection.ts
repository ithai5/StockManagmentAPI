import { DbObjectMapping } from "../dbObjectMapping";
import { PrismaClient } from "@prisma/client";
import { StockValue } from "../../modules/walletId";

const prismaMySql = new PrismaClient();

export const mySqlData: DbObjectMapping = {
  async getWalletStocks(walletId) {
    const queryResult = await prismaMySql.walletHasStock.findMany({
      where: {
        fkWalletId: walletId,
      },
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
  async getWallet(walletId) {
    const queryResult = await prismaMySql.wallet.findUnique({
      where: {
        walletId: walletId,
      },
    });
    return queryResult ? queryResult : new Error("wallet not found");
  },
};
