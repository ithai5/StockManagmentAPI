import {StockMysqlRepository} from "../../repositories/mysql/stock.mysql.repository";
import {InterfaceStockDatabaseService} from "../interface-stock.database-service";

export const stockMysqlService: InterfaceStockDatabaseService = {
    getStock: async (stockTicker: string) => {
        const stock = await StockMysqlRepository.getStock(stockTicker)
        if (stock) return stock;
        else throw Error("Stock ticker not found");
    }
}
