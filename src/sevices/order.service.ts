import { switchSelectDatabaseService } from "./repository.service";
import { currentDatabase, Databases } from "../global/database-control";
import {OrderRequest} from "../models/order-request";
import { getStock } from "./stock.service";
import { WalletStockValue } from "../models/dto/wallet.dto";
import { OrderDetail } from "../models/dto/order-detail.dto";

const {Order, WalletStock} = switchSelectDatabaseService(currentDatabase);

export const placeOrderForWallet = async (order: OrderRequest) => {
	try {
		/*get stock value*/
		const currentPrice = await getStock(order.ticker);

		// TODO: Implement a method for fetching row with specific stock ticker for validation.
		const walletStocksBeforeOrder = await WalletStock.getWalletStocks(order.walletId);

		const orderCreated = currentPrice?.currentPrice ? await Order.createOrder(order, currentPrice.currentPrice) : null;

		// TODO: Implement validate order once wallet stock with stock ticker is done.
		validateOrder(walletStocksBeforeOrder, orderCreated)

		return orderCreated;

	} catch (error) {
		console.log("Error placing order ", error);
		return null;
	}

	return null;
};

const validateOrder = (stocks: WalletStockValue[] | null, order: OrderDetail | null) => {
	console.log("stocks in wallet: ", stocks);
	console.log("order created: ", order);
	console.log("Validate Order, Not Implemented yet! See TODO's !");
}

