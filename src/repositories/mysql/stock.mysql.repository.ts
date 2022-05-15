import { InterfaceStockRepository } from "../interface-stock.repository";
import { StockValue } from "../../models/dto/stock-value.dto";
import { prismaMySql } from "../../database-connection/mysql.database-connection";

export const StockMysqlRepository: InterfaceStockRepository = {
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
