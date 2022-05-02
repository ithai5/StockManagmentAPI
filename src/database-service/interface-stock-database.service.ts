import {StockMysqlRepository} from "../repositories/mysql/stock.mysql.repository";
import {StockValue} from "../models/dto/stock-value.dto";

export interface InterfaceStockDatabaseService {
    getStock: (stockTicker: string) => Promise<StockValue>
}

export const StockMysqlService: InterfaceStockDatabaseService = {
    getStock: async (stockTicker: string) => {
        const stock = await StockMysqlRepository.getStock(stockTicker)
        if (stock) return stock;
        else throw Error("Stock ticker not found");
    }
}