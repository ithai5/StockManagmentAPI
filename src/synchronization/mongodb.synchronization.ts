import { ObjectId } from "bson";
import {
  order as orderMongo,
  walletHasStock as walletHasStockMongodb, 
  stock as stockMongo,
  transferFrom as transferFromMongodb,
  transferTo as transferToMongodb,
  wallet as walletMongodb, 
  player as playerMongodb,
} from "../../prisma/mongodb/client";
import { 
  order as orderMysql,
  WalletHasStock as walletHasStockMysql,
  stock as stockMysql,
  transfer as transferMysql,
  wallet as walletMysql,
  player as playerMysql,
} from "../../prisma/mysql/client";
import { prismaMongodb } from "../database-connection/mongodb.database-connection";
import { prismaMySql } from "../database-connection/mysql.database-connection";

const walletIdMap = new Map();

interface walletAndTransfers {
  fkWalletId: number,
  transfersFrom: transferMysql[],
  transfersTo: transferMysql[]
}

function getByValue(map: any, searchValue: string) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue)
      return key;
  }
}

export const populateMongodbPlayersAndWallets = async () => {
  const playerData = await prismaMySql.player.findMany({
    include: {
      wallets: {
        include: {
          orders: true,
          stocks: true,
          transfersFrom: true,
          transfersTo: true,
        }
      }
    },
    take: 10, // Select how many you want to import, if removed it'll take all
  });

  if(!playerData){
    console.log("Player data was empty, aborting synchronization!");
    return;
  }

  // Need to generate all wallet Ids so that I can reference 
  playerData.forEach(player => {
    player.wallets.forEach(wallet => {
      const genId = new ObjectId().toHexString();
      walletIdMap.set(wallet.walletId, genId);
    })
  })

  // Loop through all players: 
  const playerAndWalletsCreated = playerData.map( async (playerObj) => {
    
    const createdPlayer = await prismaMongodb.player.create({
      data: {
        name: playerObj.name,
        email: playerObj.email,
        phone: playerObj.phone,
        password: playerObj.password
      }
    });

    // Had some troubles with the async, was creating before I got to update.
    // NOTE: Realised later that I wasn't setting the generated id's from here in create
    //			 so it was probably that, a 'foreign key constraint' equivalent from mongo.
    const walletsMysqlTransfers: walletAndTransfers[] = [];
    // Loop through players wallets:
    const walletsCreated = playerObj.wallets.map( async (walletObj) => {

      const wallet: walletMongodb = mapWallet(walletObj);
      const orders: orderMongo[] = mapOrdersMysqlToMongodb(walletObj.orders);
      const walletStocks: walletHasStockMongodb[] = mapWalletHasStockMysqlToMongodb(walletObj.stocks);
      walletsMysqlTransfers.push({
        fkWalletId: walletObj.walletId,
        transfersFrom: walletObj.transfersFrom,
        transfersTo: walletObj.transfersTo
      })

      return prismaMongodb.wallet.create({
        data: {
          player: {connect: { playerId: createdPlayer.playerId}},
          walletId: wallet.walletId,
          nickname: wallet.nickname,
          balance: wallet.balance,
          created: wallet.created,
          stocks: walletStocks,
          orders: orders,
          transfersFrom: [],
          transfersTo: [],
        }
      });
      
    });

    const updatedWallets = walletsCreated.map(async (obj) => {
      const findMysqlWallet = walletsMysqlTransfers.find(async (w) => {
        w.fkWalletId === getByValue(walletIdMap, (await obj).walletId);
      })
      return prismaMongodb.wallet.update({
        where: {
          walletId: (await obj).walletId
        },
        data: {
          transfersFrom: mapTransfersMysqlToMongodb(findMysqlWallet!.transfersFrom, false) as transferFromMongodb[],
          transfersTo: mapTransfersMysqlToMongodb(findMysqlWallet!.transfersTo, true) as transferToMongodb[],
        }
      });
    })
  
    console.log("__________________________________________________________________");
    console.log("Player and wallets for that player created : \n", {player: createdPlayer, wallets: updatedWallets});
    console.log("__________________________________________________________________");
    return {player: createdPlayer, wallets: updatedWallets}
  });
}

export const populateStocksMongo = async () => {
  const stocksGetMysql = await prismaMySql.stock.findMany({take: 1});
  const mongosStocks = mapStocksMysqlToMongodb(stocksGetMysql);
  const created = await prismaMongodb.stock.create({
    data: {
      stockTicker: mongosStocks[0].stockTicker,
      name: mongosStocks[0].name,
      description: mongosStocks[0].description,
      currentPrice: mongosStocks[0].currentPrice,
      percentChange: mongosStocks[0].percentChange,
      lastUpdated: mongosStocks[0].lastUpdated,
    }
  })
  console.log("Stocks created: ", created);
}

const mapWallet = (walletObj: walletMysql) => {
  const genId = new ObjectId().toHexString();
  walletIdMap.set(walletObj.walletId, genId); 
  const wallet: walletMongodb = {
    walletId: genId, // Either generate or create here.
    fkPlayerId: walletObj.fkPlayerId.toString(),
    nickname: walletObj.nickname,
    balance: walletObj.balance,
    created: walletObj.created,
    stocks: [],
    orders: [],
    transfersFrom: [],
    transfersTo: [],
  };
  return wallet;
}

const mapOrdersMysqlToMongodb = (orderMysql: orderMysql[]) => {
  return orderMysql.map((e) => {
    const order: orderMongo = {
      stockTicker: e.fkStockTicker,
      stockPrice: e.stockShares,
      stockShares: e.stockShares,
      date: e.date,
      type: e.type
    }
    return order;
  })
}

const mapWalletHasStockMysqlToMongodb = (walletHasStocksMysql: walletHasStockMysql[]) => {
  return walletHasStocksMysql.map((e) => {
    const walletHasStock: walletHasStockMongodb = {
      stockTicker: e.fkStockTicker,
      avgPrice: e.avgPrice,
      stockShares: e.stockShares
    };
    return walletHasStock;
  })
}

const mapStocksMysqlToMongodb = (stocksMysql: stockMysql[]) => {
  return stocksMysql.map((e) => {
    const genId = new ObjectId().toHexString();
    const stock: stockMongo = {
      stockId: genId,
      stockTicker: e.stockTicker,
      name: e.name,
      description: e.description,
      currentPrice: e.currentPrice,
      percentChange: e.percentChange,
      lastUpdated: e.lastUpdated
    };
    return stock;
  })
}


const mapTransfersMysqlToMongodb = (transfersMysql: transferMysql[], isTransfersTo: boolean) => {
  return transfersMysql.map((e) => {
    if(isTransfersTo){
      const transfer: transferToMongodb = {
        walletTo: walletIdMap.get(e.fkWalletTo),
        date: e.date,
        amount: e.amount
      }
      return transfer;
    } else {
      const transfer: transferFromMongodb = {
        walletFrom: walletIdMap.get(e.fkWalletFrom),
        date: e.date,
        amount: e.amount
      }
      return transfer;
    }
  })
}
