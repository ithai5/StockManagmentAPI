export interface OrderRequest {
  orderType: OrderType
  walletId: number;
  ticker: string;
  amount: number;
}

export enum OrderType {
  Buy = "BUY",
  Sell = "SELL"
}