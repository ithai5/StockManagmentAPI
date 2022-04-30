import { WalletStockValue } from "../models/dto/wallet.dto";

export interface InterfaceWalletStockRepository {
  getWalletStocks: (walletId: number) => Promise<WalletStockValue[]>;
}
