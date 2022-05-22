import { WalletStockValue } from "../models/dto/wallet.dto";

export interface InterfaceWalletStockRepository {
  getWalletStocks: (walletId: string) => Promise<WalletStockValue[] | null>;
}
