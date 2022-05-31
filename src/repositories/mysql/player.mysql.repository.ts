import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { WalletDto, WalletDtoSelect } from "../../models/dto/wallet.dto";
import { InterfacePlayerRepository } from "../interface-player.repository";

export const PlayerMysqlRepository: InterfacePlayerRepository = {
  getAllWalletsForPlayer(playerId: string): Promise<WalletDto[] | null> {
    const playerIdNumber: number = +playerId;
    return prismaMySql.wallet.findMany({
      where: {
        fkPlayerId: playerIdNumber,
      },
      select: WalletDtoSelect,
    });
  },
  async playerHasWallet(playerId: string, walletId: string) {
    const playerIdNumber: number = +playerId;
    const walletIdNumber: number = +walletId;
    const wallet = await prismaMySql.wallet.findUnique({
      where: {
        walletId: walletIdNumber,
      },
      select: {
        fkPlayerId: true,
        nickname: true,
        balance: true,
      },
    });

    return wallet?.fkPlayerId === playerIdNumber ? wallet : null;
  },
};
