import {PlayerMysqlRepository} from "../repositories/mysql/player.mysql.repository";
import {WalletDto} from "../models/dto/wallet.dto";

export interface InterfacePlayerDatabaseService {
    getAllWalletsForPlayer: (playerId: number) => Promise<WalletDto[]>
    playerHasWallet: (playerId: number, walletId: number) => Promise<boolean | Error>
}

export const playerMysqlService: InterfacePlayerDatabaseService = {
    getAllWalletsForPlayer: (playerId: number)=>  PlayerMysqlRepository.getAllWalletsForPlayer(playerId),
    playerHasWallet: async (playerId: number, walletId: number) => {
        const player = await PlayerMysqlRepository.playerHasWallet(playerId, walletId)
        return player.length > 0 ? true : new Error("Wallet Not Found!")
    }
}