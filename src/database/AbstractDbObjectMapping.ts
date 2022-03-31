export interface AbstractDbObjectMapping {
  getAccountStocks: (accountId: number) => AccountStocks;
}

export enum OrderType {
  BUY = "BUY",
  SELL = "SELL",
}

export interface AccountStocks {
  accountId: number;
  stocksOwned: StockValue[];
}
export interface StockValue {
  stockTicker: string;
  stockShares: number;
  avgPrice: number;
}
