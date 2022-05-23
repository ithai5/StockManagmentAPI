import { WalletDto } from "../models/dto/wallet.dto";

export interface InterfacePlayerRepository {
  getAllWalletsForPlayer: (playerId: string) => Promise<WalletDto[] | null>;
  playerHasWallet: (playerId: string, walletId: string) => Promise<WalletDto | null>;
}