import { InterfacePlayerRepository } from "./interface-player.repository";
import { InterfaceWalletRepository } from "./interface-wallet.repository";
import { InterfaceWalletStockRepository } from "./interface-wallet-stock.repository";
import { InterfaceRepository } from "./interface-repository";
import { PlayerMysqlRepository } from "./mysql/player.mysql.repository";
import { WalletMysqlRepository } from "./mysql/wallet.mysql.repository";
import { WalletStockMysqlRepository } from "./mysql/wallet-stock.mysql.repository";
import { InterfaceOrderRepository } from "./interface-order.repository";
import { OrderMysqlRepository } from "./mysql/order.mysql.repository";
import { InterfaceStockRepository } from "./interface-stock.repository";
import { StockMysqlRepository } from "./mysql/stock.mysql.repository";

export interface DatabaseRepository {
  Player: InterfacePlayerRepository;
  Wallet: InterfaceWalletRepository;
  WalletStock: InterfaceWalletStockRepository;
  Order: InterfaceOrderRepository;
  Stock: InterfaceStockRepository;
}

export const REPOSITORIES: InterfaceRepository = {
  MySQL: {
    Player: PlayerMysqlRepository,
    Wallet: WalletMysqlRepository,
    WalletStock: WalletStockMysqlRepository,
    Order: OrderMysqlRepository,
    Stock: StockMysqlRepository,

  },
  MongoDB: undefined,
  Neo4j: undefined,
};
