import { prismaMongodb } from "../../database-connection/mongodb.database-connection";
import { WalletDto } from "../../models/dto/wallet.dto";
import { InterfaceWalletRepository } from "../interface-wallet.repository";

// Todo : Test endpoint
export const WalletMongodbRepository: InterfaceWalletRepository = {
  async createWallet(walletId: string, playerId: string): Promise<WalletDto> {
    return prismaMongodb.wallet.create({
      data: {
        walletId: walletId.replace("-", ""),
        balance: 1000000,
        created: new Date(),
        fkPlayerId: playerId.replace("-", ""),
        nickname: walletId,
      },
    });
  },
  getWallet: async function (walletId: string): Promise<WalletDto | null> {
    return prismaMongodb.wallet.findUnique({
      // Todo: We handling nulls?
      where: {
        walletId: walletId,
      },
      select: {
        nickname: true,
        balance: true,
        walletId: true,
      },
    });
  },
};
