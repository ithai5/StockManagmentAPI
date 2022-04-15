import { Authentication } from "../authentication";
import { PlayerDto } from "../../models/playerDto";
import { prismaMySql } from "../../dbConnection/mySqlConnection";
import { SignupDto } from "../../models/signupDto";

export const authenticationMySql: Authentication = {
  signupPlayer(signupDto: SignupDto): Promise<PlayerDto> {
    return prismaMySql.player.create({ data: signupDto }).catch((reason) => {
      throw Error(reason);
    });
  },
  loginPlayer(email: string): Promise<PlayerDto | null> {
    return prismaMySql.player
      .findUnique({
        where: {
          email: email,
        },
      })
      .catch((reason) => {
        throw Error(reason);
      });
  },
};
