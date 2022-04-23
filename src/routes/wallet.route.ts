import { Router } from "express";
import { getAllWalletsForPlayer, getWallet, getWalletStocks } from "../sevices/wallet.service";
import { isNumberRegex } from "../utils/input-checks";

export const walletRoutes = Router();

// TODO: Add Swagger docs for these api endpoints 

walletRoutes.get("/:walletId", (req, res) => {
  if(isNumberRegex(req.params.walletId)){
    const walletId: number = +req.params.walletId;
    getWallet(walletId)
      .then((data) => {
        res.json({wallet: data});
      })
      .catch((error: Error) => {
        throw error
      });
  } else {
    res.send({error: 'Id is not a number'});
  }
});

walletRoutes.get("/player-wallets/:playerId", (req, res) => {
  if(isNumberRegex(req.params.playerId)){
    const playerId: number = +req.params.playerId;
    getAllWalletsForPlayer(playerId)
      .then((data) => {
        res.json({playerWallets: data});
      })
      .catch((error: Error) => {
        throw error;
      });
  } else {
    res.send({error: 'Id is not a number'});
  }
});

walletRoutes.get("/stocks-owned/:walletId", (req, res) => {
  // First check the input id from the params.
  if(isNumberRegex(req.params.walletId)){
    const walletId: number = +req.params.walletId;
    getWalletStocks(walletId)
      .then((data) => {
        res.json({walletStocks: data});
      })
      .catch((error: Error) => {
        throw error;
      });
  } else {
    res.send({error: 'Id is not a number'});
  }
});

