import { InterfaceWalletRepository } from "../interface-wallet.repository";
import { WalletDto } from "../../models/dto/wallet.dto";
import { neo4jConnection } from "../../database-connection/neo4j.database-connection";

export const walletNeo4jRepository: InterfaceWalletRepository = {
  async getWallet(walletId: string): Promise<WalletDto | null> {
    const queryResult = await neo4jConnection(
      `MATCH (wallet:Wallet) WHERE id(wallet)=$walletId RETURN wallet`,
      { walletId: +walletId }
    );
    return queryResult.records[0].get(0).properties;
  },
};
