import { WalletMongodbRepository } from "../../repositories/mongodb/wallet.mongodb.repository";
import { InterfaceWalletDatabaseService } from "../interface-wallet.database-service";
import { WalletDto } from "../../models/dto/wallet.dto";
import { convertV4ToMongo } from "../../utils/uuid-management";

export const walletMongodbService: InterfaceWalletDatabaseService = {
  createWallet(playerId: string, walletId: string): Promise<WalletDto> {
    const mongoWalletId = convertV4ToMongo(walletId);
    const mongoPlayerId = convertV4ToMongo(playerId);
    return WalletMongodbRepository.createWallet(mongoWalletId, mongoPlayerId);
  },
  getWallet: async (walletId: string) => {
    const wallet = await WalletMongodbRepository.getWallet(walletId);
    if (wallet) return wallet;
    else throw Error("wallet not found");
  },
};
