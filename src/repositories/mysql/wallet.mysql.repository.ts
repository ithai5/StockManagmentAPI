import { InterfaceWalletRepository } from "../interface-wallet.repository";
import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { WalletDto, WalletDtoSelect } from "../../models/dto/wallet.dto";
import { parse, stringify } from "uuid";

export const WalletMysqlRepository: InterfaceWalletRepository = {
  async createWallet(walletId: string, playerId: string): Promise<WalletDto> {
    console.log(Buffer.from(Array.from(parse(walletId))));
    const result = await prismaMySql.wallet.create({
      data: {
        walletId: Buffer.from(Array.from(parse(walletId))),
        balance: 1000000,
        nickname: walletId,
        fkPlayerId: Buffer.from(Array.from(parse(playerId))),
        created: new Date(),
      },
    });
    return { ...result, walletId: stringify(result.walletId) };
  },
  async getWallet(walletId) {
    const result = await prismaMySql.wallet.findUnique({
      where: {
        walletId: Buffer.from(walletId),
      },
      select: WalletDtoSelect,
    });
    if (result === null) return null;
    return { ...result, walletId: stringify(result.walletId) };
  },
};
