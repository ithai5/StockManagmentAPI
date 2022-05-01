export interface StockValue {
  stockTicker: string;
  currentPrice: number | null;
  description: string | null;
  percentageChange?: number | null;
  lastUpdated?: Date;
  name?: string;
}
