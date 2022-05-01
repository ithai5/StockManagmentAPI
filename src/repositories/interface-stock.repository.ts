import { StockValue } from "../models/dto/stock-value.dto";

export interface InterfaceStockRepository {
  getStock: (stockTicker: string) => Promise<StockValue>;
}
