import {WalletDto} from "../models/dto/wallet.dto";

export interface InterfacePlayerDatabaseService {
    getAllWalletsForPlayer: (playerId: number) => Promise<WalletDto[]>
    playerHasWallet: (playerId: number, walletId: number) => Promise<boolean | Error>
}

