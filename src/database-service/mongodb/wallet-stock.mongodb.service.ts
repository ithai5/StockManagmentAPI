import { WalletStockValue } from "../../models/dto/wallet.dto";
import { WalletStockMongodbRepository } from "../../repositories/mongodb/wallet-stock.mongodb.repository";
import { InterfaceWalletStockDatabaseService } from "../interface-wallet-stock.database-service";

export const walletStockMongodbService: InterfaceWalletStockDatabaseService = {
  getWalletStocks: (walletId: string) => WalletStockMongodbRepository.getWalletStocks(walletId),
  getWalletStocksWithStockTicker: function (walletId: string, stockTicker: string): Promise<WalletStockValue | null> {
    return WalletStockMongodbRepository.getWalletStocksWithStockTicker(walletId, stockTicker);
  }
}