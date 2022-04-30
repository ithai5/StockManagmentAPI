export interface OrderDetail {
  stockTicker: string;
  amount: number;
  pricePerStock: number | null;
  date: Date;
  balanceRemaining?: number;
}