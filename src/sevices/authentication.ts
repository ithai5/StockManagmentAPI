import { authenticationMySql } from "../repository/mysqlRepository/authenticationMySql";
import bcryptjs from "bcryptjs";
import { PlayerDto } from "../models/playerDto";
import { Authentication } from "../repository/authentication";
import jsonwebtoken, { SignOptions } from "jsonwebtoken";
import "dotenv/config";

export async function getPlayerDtoByEmail(email: string): Promise<PlayerDto> {
  const playerDto = await authentication.loginPlayer(email);
  if (playerDto) return playerDto;
  else throw Error("Player not found");
}

const passwordDecrypted = (receivedPassword: string, savedPassword: string) => {
  return bcryptjs.compareSync(receivedPassword, savedPassword);
};

export const generateJwtToken = (data: Object, options: SignOptions) => {
  return jsonwebtoken.sign(
    { ...data },
    process.env.SESSION_SECRET + "",
    options
  );
};
export const loginAuthentication = async (email: string, password: string) => {
  const playerDto = await getPlayerDtoByEmail(email);
  if (passwordDecrypted(password, playerDto.password))
    return generateJwtToken(
      { playerId: playerDto.playerId },
      { expiresIn: "10m" }
    );
  else throw Error("password and mail does not matched");
};
// should be able to change it to any db connection that implement the Authentication interface
const authentication: Authentication = authenticationMySql;
