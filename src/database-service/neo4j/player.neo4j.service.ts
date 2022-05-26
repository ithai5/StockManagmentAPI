import { InterfacePlayerDatabaseService } from "../interface-player.database-service";
import { WalletDto } from "../../models/dto/wallet.dto";
import { playerNeo4jRepository } from "../../repositories/neo4j/player.neo4j.repository";

export const playerNeo4jService: InterfacePlayerDatabaseService = {
  getAllWalletsForPlayer(playerId: string): Promise<WalletDto[] | null> {
    return playerNeo4jRepository.getAllWalletsForPlayer(playerId);
  },
  playerHasWallet(
    playerId: string,
    walletId: string
  ): Promise<WalletDto | null> {
    return playerNeo4jRepository.playerHasWallet(playerId, walletId);
  },
};
