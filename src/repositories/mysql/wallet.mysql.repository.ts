import { InterfaceWalletRepository } from "../interface-wallet.repository";
import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { WalletDtoSelect } from "../../models/dto/wallet.dto";

export const WalletMysqlRepository: InterfaceWalletRepository = {
  async getWallet(walletId) {
    const queryResult = await prismaMySql.wallet.findUnique({
      where: {
        walletId: walletId,
      },
      select: WalletDtoSelect
    });
    return queryResult ? queryResult : new Error("wallet not found");
  },
};
