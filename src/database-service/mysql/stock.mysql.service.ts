import { StockMysqlRepository } from "../../repositories/mysql/stock.mysql.repository";
import { InterfaceStockDatabaseService } from "../interface-stock.database-service";
import { StockValue } from "../../models/dto/stock-value.dto";

export const stockMysqlService: InterfaceStockDatabaseService = {
  getStock: async (stockTicker: string) => {
    const stock = await StockMysqlRepository.getStock(stockTicker);
    if (stock) return stock;
    else throw Error("Stock ticker not found");
  },
  updateStock: async (currentStockValue: StockValue) => {
    return StockMysqlRepository.updateStock(currentStockValue);
  },
};
