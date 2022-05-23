import {WalletDto} from "../models/dto/wallet.dto";

export interface InterfaceWalletDatabaseService {
    getWallet: (walletId: string) => Promise<WalletDto | null>
}

