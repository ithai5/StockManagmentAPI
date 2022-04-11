import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

interface TokenPayload {
  playerId: string;
}

export const verifyJwt = (jwt: string) => {
  try {
    return jsonwebtoken.verify(
      prepareJwt(jwt),
      process.env.SESSION_SECRET + ""
    );
  } catch (error) {
    throw Error;
  }
};
export const authMiddleware = (
  req: Request<{}, {}, TokenPayload>,
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

export const prepareJwt = (bearerToken: string) =>
  bearerToken.replace(/^Bearer\s+/, "");
