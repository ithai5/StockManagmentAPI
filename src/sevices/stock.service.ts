import { switchSelectDatabaseService } from "./repository.service";
import { Databases } from "../global/database-control";
import { StockValue } from "../models/dto/stock-value.dto";
import { finnhubApi } from "./api/finnhubConnection";

const { Stock } = switchSelectDatabaseService(Databases.MySQL);

export const getStock = async (stockTicker: string): Promise<StockValue> => {
  const cacheStockValue = await Stock.getStock(stockTicker);
  const oldestAcceptedUpdateStock = new Date(
    dateInUtc().setMinutes(dateInUtc().getMinutes() - 5)
  );
  if (oldestAcceptedUpdateStock < cacheStockValue.lastUpdated!!) {
    return cacheStockValue;
  }
  const updateResult = await updateCurrentStockValue(stockTicker);
  if (updateResult) {
    return getStock(stockTicker);
  }
  throw new Error("I dont have a name yet");
};

const dateInUtc = () => {
  return new Date(new Date().toUTCString());
};

async function updateCurrentStockValue(stockTicker: string) {
  const currentStockValue = await finnhubApi.quote(stockTicker.toUpperCase());
  const dataToUpdate: StockValue = {
    description: null,
    stockTicker: stockTicker,
    currentPrice: currentStockValue.data.c!,
    percentageChange: currentStockValue.data.dp,
    lastUpdated: dateInUtc(),
  }; // update db
  return await Stock.updateStock(dataToUpdate);
}
