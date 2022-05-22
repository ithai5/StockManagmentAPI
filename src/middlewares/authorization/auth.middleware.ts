import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../../sevices/authentication.service";
import { playerHasWallet } from "../../sevices/player.service";
import { isNumberRegex } from "../../utils/input-checks";

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

export const authPlayersWallet = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
	if(!isNumberRegex(req.params.walletId)){
		return res.status(400).send({ error: 400, message: "Id is not a number" });
	}
  playerHasWallet(req.body.playerId, req.params.walletId)
    .then((wallet) => {
			if(wallet) {
				return next(); 
			}
			// Returning will override any other res.sends in caller
			return res.status(403).send({ error: 403, message: "Not authorized" });
    })
    .catch((error) => {
      res.status(400);
      res.send({ message: error.message });
    });
};
