import { WalletDto } from "../models/dto/wallet.dto";
import { switchSelectRepository } from "./repository.service";
import { Databases } from "../global/database-control";

// Assigning the correct repository
const { Wallet } = switchSelectRepository(Databases.MySQL);

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
