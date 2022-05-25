import { InterfaceWalletDatabaseService } from "../interface-wallet.database-service";
import { WalletDto } from "../../models/dto/wallet.dto";

export const walletNeo4jService: InterfaceWalletDatabaseService = {
  getWallet(walletId: string): Promise<WalletDto | null> {
    throw Error("not implemented");
  },
};
