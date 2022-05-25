import { InterfacePlayerDatabaseService } from "../interface-player.database-service";
import { WalletDto } from "../../models/dto/wallet.dto";

export const playerNeo4jService: InterfacePlayerDatabaseService = {
  getAllWalletsForPlayer(playerId: string): Promise<WalletDto[] | null> {
    throw Error("not implemented");
  },
  playerHasWallet(
    playerId: string,
    walletId: string
  ): Promise<WalletDto | null> {
    throw Error("not implemented");
  },
};
