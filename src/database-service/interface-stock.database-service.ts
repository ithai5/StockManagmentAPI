import { StockValue } from "../models/dto/stock-value.dto";

export interface InterfaceStockDatabaseService {
  getStock: (stockTicker: string) => Promise<StockValue>;
  updateStock: (currentStockValue: StockValue) => Promise<StockValue>;
  createStock: (stockValue: StockValue) => Promise<StockValue>;
}
