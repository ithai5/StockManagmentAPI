import { prismaMongodb } from "../../database-connection/mongodb.database-connection";
import { WalletDto } from "../../models/dto/wallet.dto";
import {InterfacePlayerRepository} from "../interface-player.repository";


export const PlayerMongodbRepository: InterfacePlayerRepository = {
  getAllWalletsForPlayer: async (playerId: string): Promise<WalletDto[] | null> => {
    const playerWallets = await prismaMongodb.player.findUnique({
      where: {
        playerId: playerId
      },
      include: {
        wallets: {
          select: {
            nickname: true,
            balance: true,
          }
        }
      }
    });
    const walletsExtract = playerWallets?.wallets;
    return walletsExtract !== undefined ? walletsExtract : null;
  },
  playerHasWallet: async (playerId: string, walletId: string): Promise<WalletDto | null> => {
    const wall = await prismaMongodb.wallet.findUnique({
      where: {
        walletId: walletId
      },
      select: {
        fkPlayerId: true,
        nickname: true,
        balance: true
      }
    });
    return wall?.fkPlayerId === playerId ? {nickname: wall.nickname, balance: wall.balance} : null;
  }
}
