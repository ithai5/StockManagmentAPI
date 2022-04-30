import { switchSelectRepository } from "./repository.service";
import { Databases } from "../global/database-control";
import {OrderRequest} from "../models/order-request";

const {Order} = switchSelectRepository(Databases.MySQL);

export const placeOrderForWallet = (order: OrderRequest) => {
    return Order.createOrder(order)
}

