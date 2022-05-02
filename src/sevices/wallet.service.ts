import { WalletDto } from "../models/dto/wallet.dto";
import { switchSelectDatabaseService } from "./repository.service";
import { Databases } from "../global/database-control";

// Assigning the correct repository
const { Wallet } = switchSelectDatabaseService(Databases.MySQL);

/**
 * Get a single wallet
 *
 * @param walletId
 * @returns WalletDto :: with fields (nickname, balance)
 */
export const getWallet = async (
  walletId: number
): Promise<WalletDto | Error> => {
  return Wallet.getWallet(walletId);
};
