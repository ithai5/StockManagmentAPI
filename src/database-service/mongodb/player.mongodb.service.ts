import { WalletDto } from "../../models/dto/wallet.dto";
import { PlayerMongodbRepository } from "../../repositories/mongodb/player.mongodb.repository";
import { InterfacePlayerDatabaseService } from "../interface-player.database-service";

export const playerMongodbService: InterfacePlayerDatabaseService = {
  getAllWalletsForPlayer: (playerId: string) => PlayerMongodbRepository.getAllWalletsForPlayer(playerId),
  playerHasWallet: async (playerId: string, walletId: string): Promise<WalletDto | null> => {
      return PlayerMongodbRepository.playerHasWallet(playerId, walletId);
  }
}