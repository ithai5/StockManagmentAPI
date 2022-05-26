import { InterfaceStockDatabaseService } from "../interface-stock.database-service";
import { StockValue } from "../../models/dto/stock-value.dto";
import { stockNeo4jRepository } from "../../repositories/neo4j/stock.neo4j.repository";

export const stockNeo4jService: InterfaceStockDatabaseService = {
  createStock(stockValue: StockValue): Promise<StockValue | null> {
    return stockNeo4jRepository.createStock(stockValue);
  },
  async getStock(stockTicker: string): Promise<StockValue | null> {
    const result = await stockNeo4jRepository.getStock(stockTicker);
    if (result?.lastUpdated)
      result.lastUpdated = new Date(new Date(result.lastUpdated).toUTCString()); //converting aura local time
    return result;
  },
  updateStock(currentStockValue: StockValue): Promise<StockValue | null> {
    return stockNeo4jRepository.updateStock(currentStockValue);
  },
};
