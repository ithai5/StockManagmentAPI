import { WalletMongodbRepository } from "../../repositories/mongodb/wallet.mongodb.repository";
import {InterfaceWalletDatabaseService} from "../interface-wallet.database-service";

export const walletMongodbService: InterfaceWalletDatabaseService = {
    getWallet: async (walletId: string) => {
        const wallet = await WalletMongodbRepository.getWallet(walletId)
        if (wallet) return wallet
        else throw Error("wallet not found");
    }
};