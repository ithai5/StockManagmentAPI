import { InterfaceStockDatabaseService } from "../interface-stock.database-service";
import { StockValue } from "../../models/dto/stock-value.dto";

export const stockNeo4jService: InterfaceStockDatabaseService = {
  createStock(stockValue: StockValue): Promise<StockValue | null> {
    throw Error("not implemented");
  },
  getStock(stockTicker: string): Promise<StockValue | null> {
    throw Error("not implemented");
  },
  updateStock(currentStockValue: StockValue): Promise<StockValue | null> {
    throw Error("not implemented");
  },
};
