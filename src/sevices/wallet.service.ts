import { StockValue, WalletDto } from "../models/dto/wallet.dto";
import { InterfaceWalletRepository } from "../repositories/interface-wallet.repository";
import { WalletMysqlRepository } from "../repositories/mysql/wallet.mysql.repository";
import { switchSelectRepository } from "./repository.service";
import { InterfaceRepository } from '../repositories/interface-repository' 

/**
 * TODO:
 * - Add MongoDB and Neo4j repositories to walletService once implemented.
 */
const repositories: InterfaceRepository = {
  MySQL: WalletMysqlRepository,
  MongoDB: undefined,
  Neo4j: undefined
}

// Assigning the correct repository
const walletRepository: InterfaceWalletRepository = switchSelectRepository(repositories) as InterfaceWalletRepository;


/**
 * Get Stocks owned in the wallet
 * 
 * @param walletId - Id of the wallet
 * @returns an array of the stocks in the wallet :: with fields: (stockTicker, stockShares, avgPrice)
 */
export const getWalletStocks = async (walletId: number): Promise<StockValue[]> => {
  return walletRepository.getWalletStocks(walletId);
}

/**
 * Get a single wallet
 * 
 * @param walletId 
 * @returns WalletDto :: with fields (nickname, balance)
 */
export const getWallet = async (walletId: number): Promise<WalletDto | Error> => {

  return walletRepository.getWallet(walletId);
}

/**
 * Gets all wallets of a player
 * 
 * @param playerId 
 * @returns WalletDto[] :: with fields (nickname, balance)
 */
export const getAllWalletsForPlayer = async (playerId: number): Promise<WalletDto[] | Error> => {
  return walletRepository.getAllWalletsForPlayer(playerId);
}
