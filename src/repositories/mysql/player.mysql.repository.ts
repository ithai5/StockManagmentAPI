import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { WalletDtoSelect } from "../../models/dto/wallet.dto";
import { InterfacePlayerRepository } from "../interface-player.repository";


export const PlayerMysqlRepository: InterfacePlayerRepository = {
  async getAllWalletsForPlayer(playerId) {
    return prismaMySql.wallet.findMany({
      where: {
        fkPlayerId: playerId,
      },
      select: WalletDtoSelect
    });
  },
  async playerHasWallet (playerId: number, walletId: number) {
    const queryResult = await prismaMySql.wallet.findMany({
      where: {
        walletId: walletId,
        fkPlayerId: playerId
      },
      select: WalletDtoSelect
    });
    return queryResult.length > 0 ? true : new Error("Wallet Not Found!");
  }
}