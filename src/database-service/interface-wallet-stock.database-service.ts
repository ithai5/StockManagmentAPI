import {WalletStockValue} from "../models/dto/wallet.dto";


export interface InterfaceWalletStockDatabaseService{
    getWalletStocks: (walletId: string) => Promise<WalletStockValue[] | null>
}

