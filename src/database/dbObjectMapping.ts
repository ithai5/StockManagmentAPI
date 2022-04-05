import { StockValue, Wallet } from "../modules/walletId";

export interface DbObjectMapping {
  getWalletStocks: (walletId: number) => Promise<StockValue[]>;
  getWallet: (walletId: number) => Promise<Wallet | Error>;
}
