import { InterfaceStockDatabaseService } from "../interface-stock.database-service";
import { StockValue } from "../../models/dto/stock-value.dto";
import { stockNeo4jService } from "../neo4j/stock.neo4j.service";
import { stockMongodbService } from "../mongodb/stock.mongodb.service";
import { stockMysqlService } from "../mysql/stock.mysql.service";

export const stockDefaultDbService: InterfaceStockDatabaseService = {
  async createStock(stockValue: StockValue): Promise<StockValue | null> {
    const stock = await Promise.all([
      stockNeo4jService.createStock(stockValue),
      stockMysqlService.createStock(stockValue),
      stockMongodbService.createStock(stockValue),
    ]);
    return stock[randomIntFromInterval(0, 2)];
  },
  async getStock(stockTicker: string): Promise<StockValue | null> {
    const stock = await Promise.all<StockValue|null> ([
      stockNeo4jService.getStock(stockTicker),
      stockMysqlService.getStock(stockTicker),
      stockMongodbService.getStock(stockTicker),
    ]);
    return stock[randomIntFromInterval(0, 2)];
  },
  async updateStock(currentStockValue: StockValue): Promise<StockValue | null> {
    const stock = await Promise.all([
      stockNeo4jService.updateStock(currentStockValue),
      stockMysqlService.updateStock(currentStockValue),
      stockMongodbService.updateStock(currentStockValue),
    ]);
    return stock[randomIntFromInterval(0, 2)];
  },};

export function randomIntFromInterval(min: number, max: number) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}