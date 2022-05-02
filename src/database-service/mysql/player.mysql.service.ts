import {PlayerMysqlRepository} from "../../repositories/mysql/player.mysql.repository";
import {InterfacePlayerDatabaseService} from "../interface-player.database-service";

export const playerMysqlService: InterfacePlayerDatabaseService = {
    getAllWalletsForPlayer: (playerId: number) => PlayerMysqlRepository.getAllWalletsForPlayer(playerId),
    playerHasWallet: async (playerId: number, walletId: number) => {
        const player = await PlayerMysqlRepository.playerHasWallet(playerId, walletId)
        return player.length > 0 ? true : new Error("Wallet Not Found!")
    }
}