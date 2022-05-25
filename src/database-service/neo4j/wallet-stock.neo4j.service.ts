import { InterfaceWalletStockDatabaseService } from "../interface-wallet-stock.database-service";
import { WalletStockValue } from "../../models/dto/wallet.dto";

export const walletStockNeo4jService: InterfaceWalletStockDatabaseService = {
  getWalletStocks(walletId: string): Promise<WalletStockValue[] | null> {
    throw Error("not implemented");
  },
  getWalletStocksWithStockTicker(
    walletId: string,
    stockTicker: string
  ): Promise<WalletStockValue | null> {
    throw Error("not implemented");
  },
};