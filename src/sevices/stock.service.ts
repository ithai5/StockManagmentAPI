import { switchSelectDatabaseService } from "./repository.service";
import { Databases } from "../global/database-control";
import { StockValue } from "../models/dto/stock-value.dto";

const { Stock } = switchSelectDatabaseService(Databases.MySQL);

export const getStock = async (stockTicker: string): Promise<StockValue> => {
  const cacheStockValue= await Stock.getStock(stockTicker);
  const currentUtcTime = new Date(new Date().toUTCString())
  const oldestAcceptedUpdateStock = new Date(currentUtcTime.setMinutes(currentUtcTime.getMinutes()-5))
  if (oldestAcceptedUpdateStock < cacheStockValue.lastUpdated!) {
    console.log("this is good age")
    return cacheStockValue
  }
  // call api

  // update db
  // recursion
  console.log("damn you old")

  return cacheStockValue
};
