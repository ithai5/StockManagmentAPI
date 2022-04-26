import { WalletDto } from "../models/dto/wallet.dto";
import { InterfacePlayerRepository } from "../repositories/interface-player.repository";
import { InterfaceRepository } from "../repositories/interface-repository";
import { PlayerMysqlRepository } from "../repositories/mysql/player.mysql.repository";
import { switchSelectRepository } from "./repository.service";


const repositories: InterfaceRepository = {
  MySQL: PlayerMysqlRepository,
  MongoDB: undefined,
  Neo4j: undefined
}

const playerRepository: InterfacePlayerRepository = switchSelectRepository(repositories, repositories.MySQL);

/**
 * Gets all wallets of a player
 * 
 * @param playerId 
 * @returns WalletDto[] :: with fields (nickname, balance)
 */
 export const getAllWalletsForPlayer = async (playerId: number): Promise<WalletDto[] | Error> => {
  return playerRepository.getAllWalletsForPlayer(playerId);
}

export const playerHasWallet = (playerId: number, walletId: number): Promise<boolean | Error> => {
  return playerRepository.playerHasWallet(playerId, walletId);
}