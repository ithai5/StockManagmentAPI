import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { WalletDtoSelect } from "../../models/dto/wallet.dto";
import { InterfacePlayerRepository } from "../interface-player.repository";
import { stringify } from "uuid";

export const PlayerMysqlRepository: InterfacePlayerRepository = {
  async getAllWalletsForPlayer(playerId: string) {
    const result = await prismaMySql.wallet.findMany({
      where: {
        fkPlayerId: Buffer.from(playerId),
      },
      select: WalletDtoSelect,
    });
    return result.map((res) => {
      return { ...res, walletId: stringify(res.walletId) };
    });
  },
  async playerHasWallet(playerId: string, walletId: string) {
    const wallet = await prismaMySql.wallet.findUnique({
      where: {
        walletId: Buffer.from(walletId),
      },
      select: {
        fkPlayerId: true,
        nickname: true,
        balance: true,
        walletId: true,
      },
    });

    return wallet?.fkPlayerId === Buffer.from(playerId)
      ? { ...wallet, walletId: stringify(wallet.walletId) }
      : null;
  },
};
