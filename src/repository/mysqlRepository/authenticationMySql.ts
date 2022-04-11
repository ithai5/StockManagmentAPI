import { Authentication } from "../authentication";
import { PlayerDto } from "../../models/playerDto";
import { prismaMySql } from "../../dbConnection/mySqlConnection";

export const authenticationMySql: Authentication = {
  loginPlayer(email: string): Promise<PlayerDto | null> {
    return prismaMySql.player
      .findUnique({
        where: {
          email: email,
        },
      })
      .catch(() => {
        throw Error("Unexpected arguments");
      });
  },
};
