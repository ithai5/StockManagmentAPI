import { InterfaceWalletDatabaseService } from "../interface-wallet.database-service";
import { WalletDto } from "../../models/dto/wallet.dto";
import { walletNeo4jRepository } from "../../repositories/neo4j/wallet.neo4j.repository";

export const walletNeo4jService: InterfaceWalletDatabaseService = {
  getWallet(walletId: string): Promise<WalletDto | null> {
    return walletNeo4jRepository.getWallet(walletId);
  },
};
