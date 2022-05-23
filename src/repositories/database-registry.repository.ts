import { InterfaceDatabaseService } from "./interface-database-service";
import {InterfacePlayerDatabaseService} from "../database-service/interface-player.database-service";
import {
  InterfaceWalletDatabaseService
} from "../database-service/interface-wallet.database-service";
import {
  InterfaceWalletStockDatabaseService
} from "../database-service/interface-wallet-stock.database-service";
import {InterfaceStockDatabaseService} from "../database-service/interface-stock.database-service";
import {InterfaceOrderDatabaseService} from "../database-service/interface-order.database-service";
import {stockMysqlService} from "../database-service/mysql/stock.mysql.service";
import {orderMysqlService} from "../database-service/mysql/order.mysql.service";
import {playerMysqlService} from "../database-service/mysql/player.mysql.service";
import {walletMysqlService} from "../database-service/mysql/wallet.mysql.service";
import {walletStockMysqlService} from "../database-service/mysql/wallet-stock.mysql.service";
import { playerMongodbService } from "../database-service/mongodb/player.mongodb.service";
import { walletMongodbService } from "../database-service/mongodb/wallet.mongodb.service";
import { walletStockMongodbService } from "../database-service/mongodb/wallet-stock.mongodb.service";
import { stockMongodbService } from "../database-service/mongodb/stock.mongodb.service";
import { orderMongodbService } from "../database-service/mongodb/order.mongodb.service";

export interface DatabaseService {
  Player: InterfacePlayerDatabaseService;
  Wallet: InterfaceWalletDatabaseService;
  WalletStock: InterfaceWalletStockDatabaseService;
  Order: InterfaceOrderDatabaseService;
  Stock: InterfaceStockDatabaseService;
}

export const SERVICES: InterfaceDatabaseService = {
  MySQL: {
    Player: playerMysqlService,
    Wallet: walletMysqlService,
    WalletStock: walletStockMysqlService,
    Stock: stockMysqlService,
    Order: orderMysqlService,
  },
  MongoDB: {
    Player: playerMongodbService,
    Wallet: walletMongodbService,
    WalletStock: walletStockMongodbService,
    Stock: stockMongodbService,
    Order: orderMongodbService
  },
  Neo4j: undefined,
};
