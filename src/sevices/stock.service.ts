import { switchSelectDatabaseService } from "./repository.service";
import { Databases } from "../global/database-control";
import { StockValue } from "../models/dto/stock-value.dto";
import { finnhubApi } from "./api/finnhubConnection";

const { Stock } = switchSelectDatabaseService(Databases.MySQL);

export const getStock = async (stockTicker: string): Promise<StockValue> => {
  //catch stock ticker not found
  try {
    const cacheStockValue = await Stock.getStock(stockTicker);
    const oldestAcceptedUpdateStock = new Date(
      dateInUtc().setMinutes(dateInUtc().getMinutes() - 5)
    );
    if (oldestAcceptedUpdateStock < cacheStockValue.lastUpdated!!) {
      return cacheStockValue;
    }
  } catch (error) {
    if ((error as Error).message === "Stock ticker not found") {
      const stockFromFinnhub = await finnhubApi.quote(
        stockTicker.toUpperCase()
      );
      //assuming that a stock value cannot be free
      if (stockFromFinnhub.data.c) {
        //check if stock exist
        const createNewStock: StockValue = {
          currentPrice: stockFromFinnhub.data.c,
          description: "",
          lastUpdated: dateInUtc(),
          name: "",
          percentageChange: stockFromFinnhub.data.dp,
          stockTicker: stockTicker,
        };
        //save to db
        await Stock.createStock(createNewStock);
      } else {
        throw Error("stock Ticker does not exist in the system");
      }
    }
  }

  //execute
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
