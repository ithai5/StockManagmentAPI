import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../../sevices/authentication";

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
