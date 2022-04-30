export interface OrderDetail {
  StockTicker: string;
  amount: number;
  pricePerStock: number;
  date: Date;
  balanceRemaining: number;
}