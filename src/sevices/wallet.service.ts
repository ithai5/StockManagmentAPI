import { StockValue, WalletDto } from "../models/dto/wallet.dto";
import { InterfaceWalletRepository } from "../repositories/interface-wallet.repository";
import { WalletMysqlRepository } from "../repositories/mysql/wallet.mysql.repository";
import { switchSelectRepository } from "./repository.service";
import { InterfaceRepository } from '../repositories/interface-repository' 

const repositories: InterfaceRepository = {
  MySQL: WalletMysqlRepository,
  MongoDB: undefined,
  Neo4j: undefined
}

// Assigning the correct repository
const walletRepository: InterfaceWalletRepository = switchSelectRepository(repositories, repositories.MySQL);

/**
 * Get a single wallet
 * 
 * @param walletId 
 * @returns WalletDto :: with fields (nickname, balance)
 */
export const getWallet = async (walletId: number): Promise<WalletDto | Error> => {

  return walletRepository.getWallet(walletId);
}