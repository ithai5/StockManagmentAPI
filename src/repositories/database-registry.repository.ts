import { InterfaceDatabaseService } from "./interface-database-service";
import {InterfacePlayerDatabaseService, playerMysqlService} from "../database-service/interface-player-database.service";
import {
  InterfaceWalletDatabaseService,
  walletMysqlService
} from "../database-service/interface-wallet-database.service";
import {
  InterfaceWalletStockDatabaseService,
  walletStockMysqlService
} from "../database-service/interface-wallet-stock-database.service";
import {InterfaceStockDatabaseService, stockMysqlService} from "../database-service/interface-stock-database.service";
import {InterfaceOrderDatabaseService, orderMysqlService} from "../database-service/interface-order-database.service";

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
  MongoDB: undefined,
  Neo4j: undefined,
};
