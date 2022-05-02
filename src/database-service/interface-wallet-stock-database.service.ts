import {WalletStockMysqlRepository} from "../repositories/mysql/wallet-stock.mysql.repository";
import {WalletStockValue} from "../models/dto/wallet.dto";


export interface InterfaceWalletStockDatabaseService{
    getWalletStocks: (walletId: number) => Promise<WalletStockValue[]>
}

export const walletStockMysqlService: InterfaceWalletStockDatabaseService = {
    getWalletStocks: (walletId: number)=> WalletStockMysqlRepository.getWalletStocks(walletId)
}