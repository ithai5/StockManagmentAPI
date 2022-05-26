import { neo4jConnection } from "../../database-connection/neo4j.database-connection";
import { OrderRequest } from "../../models/order-request";

export const orderNeo4jRepository = {
  createNewStockWalletRelation: async (
    orderRequest: OrderRequest,
    avgPrice: number
  ) => {
    const queryResult = await neo4jConnection(
      `MATCH (stock:Stock {stockTicker: $ticker}) 
                   MATCH (wallet:Wallet) WHERE id(wallet)=$walletId
                   MERGE (wallet)-[owns:OWNS {avgPrice: $avgPrice, stockShares: $amount}]->(stock)
                   SET wallet.balance=wallet.balance-($amount*$avgPrice)
                   CREATE (order:Order {type: $orderType, 
                                        date: dateTime(), 
                                        stockPrice: $avgPrice, 
                                        stockShares: $amount, 
                                        stockTicker: $ticker })
                   MERGE (wallet)-[:ORDERED]->(order)
                   RETURN owns`,
      { ...orderRequest, avgPrice, walletId: +orderRequest.walletId }
    );
    return queryResult.records[0].get(0).properties;
  },
  updateExistStockWalletRelation: async (
    orderRequest: OrderRequest,
    avgPrice: number,
    walletBalance: number
  ) => {
    return (
      await neo4jConnection(
        `MATCH (wallet:Wallet)-[owns:OWNS]->(stock:Stock {stockTicker: $ticker}) WHERE id(wallet)=$walletId 
                     SET owns.avgPrice= $avgPrice ,
                         owns.stockShares= owns.stockShares + $amount, 
                         wallet.balance=$remainingBalance
                     CREATE (order:Order {type: $orderType, 
                                          date: dateTime(), 
                                          stockPrice: $avgPrice, 
                                          stockShares: $amount, 
                                          stockTicker: $ticker })
                     MERGE (wallet)-[:ORDERED]->(order)
                     RETURN owns`,
        {
          ...orderRequest,
          avgPrice,
          walletId: +orderRequest.walletId,
          remainingBalance: walletBalance - avgPrice * orderRequest.amount,
        }
      )
    ).records[0].get(0).properties;
  },
  createOrderNode: async (orderRequest: OrderRequest, stockPrice: number) => {
    return (
      await neo4jConnection(
        `MATCH (wallet:Wallet) WHERE id(wallet)= $walletId
                     CREATE (order:Order {type: $orderType, 
                                          date: dateTime(), 
                                          stockPrice: $stockPrice, 
                                          stockShares: $amount, 
                                          stockTicker: $ticker })
                     MERGE (wallet)-[:ORDERED]->(order)
                     RETURN order
    `,
        { ...orderRequest, stockPrice, walletId: +orderRequest.walletId }
      )
    ).records[0].get(0).properties;
  },
  orderSellingStock: async (orderRequest: OrderRequest, avgPrice: number) => {
    const queryResult = await neo4jConnection(
      `MATCH (wallet:Wallet)-[owns:OWNS]->(stock:Stock {stockTicker: $ticker})
                   WHERE id(wallet)=$walletId
                   SET wallet.balance=wallet.balance + (owns.stockShares*owns.avgPrice)
                   CREATE (order:Order {type: $orderType, 
                                        date: dateTime(), 
                                        stockPrice: $avgPrice, 
                                        stockShares: $amount, 
                                        stockTicker: $ticker })
                   MERGE (wallet)-[:ORDERED]->(order)
                   DELETE owns
                   RETURN wallet`,
      {
        ...orderRequest,
        avgPrice,
        walletId: +orderRequest.walletId,
        orderType: orderRequest.orderType,
      }
    );
    return queryResult.records[0].get(0).properties;
  },
  updateSellingStock: async (orderRequest: OrderRequest, avgPrice: number) => {
    const queryResult = await neo4jConnection(
      `MATCH (wallet:Wallet)-[owns:OWNS]->(stock:Stock {stockTicker: $ticker})
                   WHERE id(wallet)=$walletId
                   SET wallet.balance=wallet.balance + (owns.stockShares*owns.avgPrice), 
                       owns.stockShares=owns.stockShares-$amount
                   CREATE (order:Order {type: $orderType, 
                                        date: dateTime(), 
                                        stockPrice: $avgPrice, 
                                        stockShares: $amount, 
                                        stockTicker: $ticker })
                   MERGE (wallet)-[:ORDERED]->(order)
                   RETURN wallet`,
      { ...orderRequest, avgPrice, walletId: +orderRequest.walletId }
    );
    return queryResult.records[0].get("wallet").properties;
  },
};
