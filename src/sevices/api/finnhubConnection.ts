import { Configuration, DefaultApi } from "../../api/finnhubService";
import "dotenv/config";

const apikey =
  process.env.APP_ENV === "production"
    ? process.env.FINNHUB_API_TOKEN
    : process.env.FINNHUB_API_TOKEN_SANDBOX;

const apiConfig: Configuration = new Configuration({
  apiKey: apikey,
});

/**can be used for making any call to the finnhub api*/
export const finnhubApi = new DefaultApi(apiConfig);
