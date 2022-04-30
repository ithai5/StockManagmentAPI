import { InterfaceStockRepository } from "../interface-stock.repository";
import { StockValue } from "../../models/dto/stock-value.dto";
import { prismaMySql } from "../../database-connection/mysql.database-connection";

export const StockMysqlRepository: InterfaceStockRepository = {
  async getStock(stockTicker: string): Promise<StockValue> {
    const queryResult = await prismaMySql.stock.findUnique({
      where: {
        stockTicker: stockTicker,
      },
    });
    if (queryResult) return queryResult;
    else throw Error("Stock ticker not found");
  },
};
