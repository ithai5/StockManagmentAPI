import { InterfaceWalletRepository } from "../interface-wallet.repository";
import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { StockValue, WalletDtoSelect, StockValueSelect } from "../../models/dto/wallet.dto";

export const WalletMysqlRepository: InterfaceWalletRepository = {
  async getWalletStocks(walletId) {
    const queryResult = await prismaMySql.walletHasStock.findMany({
      where: {
        fkWalletId: walletId,
      },
      select: StockValueSelect // NOTE: Is redundant since we're creating the object below
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
      select: WalletDtoSelect
    });
    return queryResult ? queryResult : new Error("wallet not found");
  },
  async getAllWalletsForPlayer(playerId) {
    return prismaMySql.wallet.findMany({
      where: {
        fkPlayerId: playerId,
      },
      select: WalletDtoSelect
    });
  },
};
