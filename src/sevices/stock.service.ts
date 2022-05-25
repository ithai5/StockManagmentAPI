import { switchSelectDatabaseService } from "./repository.service";
import { currentDatabase } from "../global/database-control";
import { StockValue } from "../models/dto/stock-value.dto";
import { finnhubApi } from "./api/finnhubConnection";

const { Stock } = switchSelectDatabaseService(currentDatabase);

export const getStock = async (
  stockTicker: string
): Promise<StockValue | null> => {
  try {
    const cacheStockValue = await Stock.getStock(stockTicker);

    const oldestAcceptedUpdateStock = new Date(
      dateInUtc().setMinutes(dateInUtc().getMinutes() - 5)
    );

    console.log("oldestAcceptedUpdateStock: ", oldestAcceptedUpdateStock);
    console.log("cacheStockValue: ", cacheStockValue);
    if (oldestAcceptedUpdateStock < cacheStockValue?.lastUpdated!) {
      return cacheStockValue;
    }
  } catch (error) {
    if ((error as Error).message === "Stock ticker not found") {
      const stockFromFinnhub = await finnhubApi.quote(
        stockTicker.toUpperCase()
      );
      //assuming that a stock value cannot be free
      if (stockFromFinnhub.data.c) {
        const createNewStock: StockValue = {
          currentPrice: stockFromFinnhub.data.c,
          description: "",
          lastUpdated: dateInUtc(),
          name: "",
          percentageChange: stockFromFinnhub.data.dp,
          stockTicker: stockTicker,
        };
        await Stock.createStock(createNewStock);
      } else {
        throw Error("stock Ticker does not exist in the system");
      }
    } else {
      throw error;
    }
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
  return Stock.updateStock(dataToUpdate);
}
