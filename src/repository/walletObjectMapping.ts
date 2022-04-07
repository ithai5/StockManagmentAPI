import { StockValue, WalletDto } from "../models/walletDto";

export interface WalletObjectMapping {
  getWalletStocks: (walletId: number) => Promise<StockValue[]>;
  getWallet: (walletId: number) => Promise<WalletDto | Error>;
  getAllWalletsForPlayer: (playerId: number) => Promise<WalletDto[]>;
}
