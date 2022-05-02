import { InterfaceWalletRepository } from "../interface-wallet.repository";
import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { WalletDtoSelect } from "../../models/dto/wallet.dto";

export const WalletMysqlRepository: InterfaceWalletRepository = {
   getWallet(walletId) {
    return  prismaMySql.wallet.findUnique({
      where: {
        walletId: walletId,
      },
      select: WalletDtoSelect
    });
  },
};
