import { StockValue, Wallet } from "../moduls/wallet";

export interface WalletObjectMapping {
  getWalletStocks: (walletId: number) => Promise<StockValue[]>;
  getWallet: (walletId: number) => Promise<Wallet | Error>;
  getAllWalletsForPlayer: (playerId: number) => Promise<Wallet[]>;
}
