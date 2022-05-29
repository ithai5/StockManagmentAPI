import { WalletDto } from "../models/dto/wallet.dto";

export interface InterfaceWalletRepository {
  getWallet: (walletId: string) => Promise<WalletDto | null>;
  createWallet: (walletId: string, playerId: string) => Promise<WalletDto>;
}
