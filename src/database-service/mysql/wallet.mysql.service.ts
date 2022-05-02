import {WalletMysqlRepository} from "../../repositories/mysql/wallet.mysql.repository";
import {InterfaceWalletDatabaseService} from "../interface-wallet.database-service";

export const walletMysqlService: InterfaceWalletDatabaseService = {
    getWallet: async (walletId: number) => {
        const wallet = await WalletMysqlRepository.getWallet(walletId)
        if (wallet) return wallet
        else throw Error("wallet not found");
    }
};