import { StockValue } from "../models/dto/stock-value.dto";

export interface InterfaceStockRepository {
  getStock: (stockTicker: string) => Promise<StockValue | null>;
  updateStock: (currentStockValue: StockValue) => Promise<StockValue>;
  createStock: (stockValue: StockValue) => Promise<StockValue>;
}
