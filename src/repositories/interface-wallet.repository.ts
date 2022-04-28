import { WalletDto } from "../models/dto/wallet.dto";


export interface InterfaceWalletRepository {
  getWallet: (walletId: number) => Promise<WalletDto | Error>;
}
