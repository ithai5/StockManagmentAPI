import { WalletDto } from "../models/dto/wallet.dto";
import { switchSelectRepository } from "./repository.service";
import { Databases } from "../global/database-control";

const { Player } = switchSelectRepository(Databases.MySQL);

/**
 * Gets all wallets of a player
 *
 * @param playerId
 * @returns WalletDto[] :: with fields (nickname, balance)
 */
export const getAllWalletsForPlayer = async (
  playerId: number
): Promise<WalletDto[] | Error> => {
  return Player.getAllWalletsForPlayer(playerId);
};

export const playerHasWallet = (
  playerId: number,
  walletId: number
): Promise<boolean | Error> => {
  console.log(playerId, walletId);
  return Player.playerHasWallet(playerId, walletId);
};
