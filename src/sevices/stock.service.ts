import { switchSelectDatabaseService } from "./repository.service";
import { Databases } from "../global/database-control";
import { StockValue } from "../models/dto/stock-value.dto";

const { Stock } = switchSelectDatabaseService(Databases.MySQL);

export const getStock = async (stockTicker: string): Promise<StockValue> => {
  return Stock.getStock(stockTicker);
};
