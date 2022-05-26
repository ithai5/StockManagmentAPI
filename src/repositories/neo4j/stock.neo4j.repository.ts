import { InterfaceStockRepository } from "../interface-stock.repository";
import { StockValue } from "../../models/dto/stock-value.dto";
import { neo4jConnection } from "../../database-connection/neo4j.database-connection";

export const stockNeo4jRepository: InterfaceStockRepository = {
  async createStock(stockValue: StockValue): Promise<StockValue | null> {
    const stock = (
      await neo4jConnection(
        `CREATE (stock:Stock {stockTicker: $stockTicker, 
                                        currentPrice: $currentPrice, 
                                        lastUpdated: dateTime(), 
                                        percentageChange: $percentageChange,
                                        name: $stockTicker,
                                        description: $description}) 
                   RETURN stock`,
        {
          ...stockValue,
        }
      )
    ).records[0].get(0);
    return stock.properties;
  },
  async getStock(stockTicker: string): Promise<StockValue | null> {
    const stock = await neo4jConnection(
      `MATCH (stock:Stock {stockTicker: $stockTicker }) RETURN stock`,
      { stockTicker: stockTicker }
    );
    if (stock.records.length === 0) throw Error("Stock ticker not found");
    return {
      ...stock.records[0].get(0).properties,
      lastUpdated: new Date(stock.records[0].get(0).properties.lastUpdated),
    };
  },
  async updateStock(currentStockValue: StockValue): Promise<StockValue | null> {
    const stock = await neo4jConnection(
      `MATCH (stock:Stock {stockTicker: $stockTicker }) 
                     SET stock.currentPrice= $currentPrice,
                         stock.percentageChange= $percentageChange,
                         stock.lastUpdated= dateTime()
                     RETURN stock`,
      {
        stockTicker: currentStockValue.stockTicker,
        currentPrice: currentStockValue.currentPrice,
        percentageChange: currentStockValue.percentageChange,
      }
    );
    return stock.records[0].get(0).properties;
  },
};
