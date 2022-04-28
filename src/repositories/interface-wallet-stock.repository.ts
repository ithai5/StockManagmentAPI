import { StockValue } from "../models/dto/wallet.dto";

export interface InterfaceWalletStockRepository {
  getWalletStocks: (walletId: number) => Promise<StockValue[]>;
}