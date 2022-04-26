import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../../sevices/authentication.service";
import { playerHasWallet } from "../../sevices/player.service";

interface TokenPayload {
  playerId: string;
}

export const authMiddleware = (
  req: Request<never, never, TokenPayload>,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.header("authorization");
  try {
    const verifiedJwt = verifyJwt(bearer + "") as TokenPayload;
    req.body.playerId = verifiedJwt.playerId;
    next();
  } catch (error) {
    res.status(401);
    res.send({ message: "unauthorized" });
  }
};

export const authPlayersWallet = (req: Request<any, any, any>, res: Response, next: NextFunction) => {
  playerHasWallet(req.body.playerId, req.params.walletId)
    .then(next)
    .catch((error) => {
      res.status(400);
      res.send({message: error.message})
    });
}