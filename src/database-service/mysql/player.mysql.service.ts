import { WalletDto } from "../../models/dto/wallet.dto";
import {PlayerMysqlRepository} from "../../repositories/mysql/player.mysql.repository";
import {InterfacePlayerDatabaseService} from "../interface-player.database-service";

export const playerMysqlService: InterfacePlayerDatabaseService = {
    getAllWalletsForPlayer: (playerId: string) => PlayerMysqlRepository.getAllWalletsForPlayer(playerId),
    playerHasWallet: async (playerId: string, walletId: string): Promise<WalletDto | null> => {
        return PlayerMysqlRepository.playerHasWallet(playerId, walletId);
    }
}