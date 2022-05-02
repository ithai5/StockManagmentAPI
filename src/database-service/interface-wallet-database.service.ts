import {WalletDto} from "../models/dto/wallet.dto";
import {WalletMysqlRepository} from "../repositories/mysql/wallet.mysql.repository";

export interface InterfaceWalletDatabaseService {
    getWallet: (walletId: number) => Promise<WalletDto>
}

export const walletMysqlService: InterfaceWalletDatabaseService = {
     getWallet: async (walletId: number) => {
         const wallet = await WalletMysqlRepository.getWallet(walletId)
         if (wallet) return wallet
         else throw Error("wallet not found");
    }
};