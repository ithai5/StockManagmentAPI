import { StockValue, Wallet } from "../modules/wallet";

export interface WalletObjectMapping {
  getWalletStocks: (walletId: number) => Promise<StockValue[]>;
  getWallet: (walletId: number) => Promise<Wallet | Error>;
  getAllWalletsForPlayer: (playerId: number) => Promise<Wallet[]>;
}
