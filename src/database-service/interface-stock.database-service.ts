import { StockValue } from "../models/dto/stock-value.dto";

export interface InterfaceStockDatabaseService {
  getStock: (stockTicker: string) => Promise<StockValue | null>;
  updateStock: (currentStockValue: StockValue) => Promise<StockValue | null>;
  createStock: (stockValue: StockValue) => Promise<StockValue | null>;
}
