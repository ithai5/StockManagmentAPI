import { StockValue } from "../models/dto/wallet.dto";
import { switchSelectRepository } from "./repository.service";
import { Databases } from "../global/database-control";

// Assigning the correct repository
const { WalletStock } = switchSelectRepository(Databases.MySQL);

/**
 * Get Stocks owned in the wallet
 *
 * @param walletId - Id of the wallet
 * @returns an array of the stocks in the wallet :: with fields: (stockTicker, stockShares, avgPrice)
 */
export const getWalletStocks = async (
  walletId: number
): Promise<StockValue[]> => {
  return WalletStock.getWalletStocks(walletId);
};
