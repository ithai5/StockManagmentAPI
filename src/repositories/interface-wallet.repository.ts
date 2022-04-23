import { StockValue, WalletDto } from "../models/dto/wallet.dto";


export interface InterfaceWalletRepository {
  getWalletStocks: (walletId: number) => Promise<StockValue[]>;
  getWallet: (walletId: number) => Promise<WalletDto | Error>;
  getAllWalletsForPlayer: (playerId: number) => Promise<WalletDto[]>;
}
