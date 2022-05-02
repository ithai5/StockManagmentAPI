import { WalletDto } from "../models/dto/wallet.dto";

export interface InterfacePlayerRepository {
  getAllWalletsForPlayer: (playerId: number) => Promise<WalletDto[]>;
  playerHasWallet: (playerId: number, walletId: number) => Promise<WalletDto[]>;
}