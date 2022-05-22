import { WalletDto } from "../models/dto/wallet.dto";
import { switchSelectDatabaseService } from "./repository.service";
import { currentDatabase, Databases } from "../global/database-control";

// Assigning the correct repository
const { Wallet } = switchSelectDatabaseService(currentDatabase);

/**
 * Get a single wallet
 *
 * @param walletId
 * @returns WalletDto :: with fields (nickname, balance)
 */
export const getWallet = async (walletId: string): Promise<WalletDto | null> => {
  return Wallet.getWallet(walletId);
};
