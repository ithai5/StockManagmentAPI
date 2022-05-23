import { WalletDto } from "../../models/dto/wallet.dto";
import {WalletMysqlRepository} from "../../repositories/mysql/wallet.mysql.repository";
import {InterfaceWalletDatabaseService} from "../interface-wallet.database-service";

export const walletMysqlService: InterfaceWalletDatabaseService = {
  getWallet: async (walletId: string): Promise<WalletDto | null> => {
    return WalletMysqlRepository.getWallet(walletId)
  }
};