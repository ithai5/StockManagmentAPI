import {Prisma} from '@prisma/client'


export interface StockValue {
  stockTicker: string;
  stockShares: number;
  avgPrice: number;
}

export const StockValueSelect = Prisma.validator<Prisma.WalletHasStockSelect>()({
  fkStockTicker: true,
  stockShares: true,
  avgPrice: true,
})

export interface WalletDto {
  nickname: string;
  balance: number;
}
/**
 * Using Prisma type safety.
 *  Our interface does not enforce us to return the declared type in the interface even if we are implementing it.
 * 
 * Keeping the above WalletDto as our general dto.
 */
export const WalletDtoSelect = Prisma.validator<Prisma.walletSelect>()({
  nickname: true, 
  balance: true
});
