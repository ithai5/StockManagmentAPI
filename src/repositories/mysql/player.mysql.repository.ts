import {prismaMySql} from "../../database-connection/mysql.database-connection";
import {WalletDtoSelect} from "../../models/dto/wallet.dto";
import {InterfacePlayerRepository} from "../interface-player.repository";


export const PlayerMysqlRepository: InterfacePlayerRepository = {
   getAllWalletsForPlayer(playerId) {
    return prismaMySql.wallet.findMany({
      where: {
        fkPlayerId: playerId,
      },
      select: WalletDtoSelect
    });
  },
   playerHasWallet (playerId: number, walletId: number) {
    return prismaMySql.wallet.findMany({
      where: {
        walletId: walletId,
        fkPlayerId: playerId
      },
      select: WalletDtoSelect
    })
  }
}