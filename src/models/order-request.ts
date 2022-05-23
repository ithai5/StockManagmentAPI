export interface OrderRequest {
  orderType: OrderType
  walletId: string;
  ticker: string;
  amount: number;
}


export enum OrderType {
  Buy = "BUY",
  Sell = "SELL"
}