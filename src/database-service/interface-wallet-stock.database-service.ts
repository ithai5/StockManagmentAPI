import {WalletStockValue} from "../models/dto/wallet.dto";


export interface InterfaceWalletStockDatabaseService{
    getWalletStocks: (walletId: number) => Promise<WalletStockValue[]>
}

