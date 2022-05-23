import { prismaMongodb } from "../../database-connection/mongodb.database-connection";
import { StockValue } from "../../models/dto/stock-value.dto";
import { InterfaceStockRepository } from "../interface-stock.repository";

export const StockMongodbRepository: InterfaceStockRepository = {
  getStock: function (stockTicker: string): Promise<StockValue | null> {
    return prismaMongodb.stock.findUnique({
      where: {
        stockTicker: stockTicker,
      },
    });
  },
  updateStock: function (currentStockValue: StockValue): Promise<StockValue | null> {
    return prismaMongodb.stock.update({
      where: { stockTicker: currentStockValue.stockTicker },
      data: {
        currentPrice: currentStockValue.currentPrice,
        percentChange: currentStockValue.percentageChange,
        lastUpdated: currentStockValue.lastUpdated,
      },
    })
  },
  createStock: function (stockValue: StockValue): Promise<StockValue | null> {
    return prismaMongodb.stock.create({
      data: {
        stockTicker: stockValue.stockTicker,
        name: stockValue.name!,
        description: stockValue.description,
        currentPrice: stockValue.currentPrice,
        percentChange: stockValue.percentageChange,
        lastUpdated: stockValue.lastUpdated!
      }
    });
  }
}