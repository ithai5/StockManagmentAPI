import { StockValue } from "../models/dto/wallet.dto";
import { InterfaceRepository } from "../repositories/interface-repository";
import { InterfaceWalletStockRepository } from "../repositories/interface-wallet-stock.repository";
import { WalletStockMysqlRepository } from "../repositories/mysql/wallet-stock.mysql.repository";
import { switchSelectRepository } from "./repository.service";


const repositories: InterfaceRepository = {
  MySQL: WalletStockMysqlRepository,
  MongoDB: undefined,
  Neo4j: undefined
}

// Assigning the correct repository
const walletStockRepository: InterfaceWalletStockRepository = switchSelectRepository(repositories, repositories.MySQL);


/**
 * Get Stocks owned in the wallet
 * 
 * @param walletId - Id of the wallet
 * @returns an array of the stocks in the wallet :: with fields: (stockTicker, stockShares, avgPrice)
 */
 export const getWalletStocks = async (walletId: number): Promise<StockValue[]> => {
  return walletStockRepository.getWalletStocks(walletId);
}