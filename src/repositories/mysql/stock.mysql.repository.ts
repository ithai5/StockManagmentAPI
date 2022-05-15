import { InterfaceStockRepository } from "../interface-stock.repository";
import { StockValue } from "../../models/dto/stock-value.dto";
import { prismaMySql } from "../../database-connection/mysql.database-connection";

export const StockMysqlRepository: InterfaceStockRepository = {
  createStock(stockValue: StockValue): Promise<StockValue> {
    return prismaMySql.stock.create({
      data: {
        stockTicker: stockValue.stockTicker,
        description: stockValue.description,
        name: stockValue.name + "",
        currentPrice: stockValue.currentPrice,
        percentChange: stockValue.percentageChange,
      },
    });
  },
  async updateStock(currentStockValue: StockValue): Promise<StockValue> {
    return await prismaMySql.stock.update({
      where: { stockTicker: currentStockValue.stockTicker },
      data: {
        currentPrice: currentStockValue.currentPrice,
        percentChange: currentStockValue.percentageChange,
        lastUpdated: currentStockValue.lastUpdated,
      },
    });
  },
  async getStock(stockTicker: string): Promise<StockValue | null> {
    return await prismaMySql.stock.findUnique({
      where: {
        stockTicker: stockTicker,
      },
    });
  },
};
