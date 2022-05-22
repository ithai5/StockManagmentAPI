import {WalletStockMysqlRepository} from "../../repositories/mysql/wallet-stock.mysql.repository";
import {InterfaceWalletStockDatabaseService} from "../interface-wallet-stock.database-service";

export const walletStockMysqlService: InterfaceWalletStockDatabaseService = {
    getWalletStocks: (walletId: string) => WalletStockMysqlRepository.getWalletStocks(walletId)
}