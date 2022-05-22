import { WalletStockValue } from "../../models/dto/wallet.dto";
import {WalletStockMysqlRepository} from "../../repositories/mysql/wallet-stock.mysql.repository";
import {InterfaceWalletStockDatabaseService} from "../interface-wallet-stock.database-service";

export const walletStockMysqlService: InterfaceWalletStockDatabaseService = {
	getWalletStocks: (walletId: string) => WalletStockMysqlRepository.getWalletStocks(walletId),
	getWalletStocksWithStockTicker: function (walletId: string, stockTicker: string): Promise<WalletStockValue | null> {
		return WalletStockMysqlRepository.getWalletStocksWithStockTicker(walletId, stockTicker);
	}
}