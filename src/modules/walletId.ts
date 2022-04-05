export interface WalletStocks {
  walletId: number;
  stocksOwned: StockValue[];
}

export interface StockValue {
  stockTicker: string;
  stockShares: number;
  avgPrice: number;
}

export interface Wallet {
  nickname: string;
  balance: number;
}
