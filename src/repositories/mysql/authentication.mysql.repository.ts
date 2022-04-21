import { InterfaceAuthentication } from "../interface-authentication.repository";
import { PlayerDto } from "../../models/dto/player.dto";
import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { SignupDto } from "../../models/dto/signup.dto";

export const authenticationMySql: InterfaceAuthentication = {
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
