import { StockValue } from "../../models/dto/stock-value.dto";
import { StockMongodbRepository } from "../../repositories/mongodb/stock.mongodb.repository";
import { InterfaceStockDatabaseService } from "../interface-stock.database-service";



export const stockMongodbService: InterfaceStockDatabaseService = {
	getStock: async (stockTicker: string) => {
		const stock = await StockMongodbRepository.getStock(stockTicker);
		if (stock) return stock;
		else throw Error("Stock ticker not found");
	},
  createStock(stockValue: StockValue): Promise<StockValue | null> {
    return StockMongodbRepository.createStock(stockValue);
  },
  updateStock: async (currentStockValue: StockValue) => {
    return StockMongodbRepository.updateStock(currentStockValue);
  },
};