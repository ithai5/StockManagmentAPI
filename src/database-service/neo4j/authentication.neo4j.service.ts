import { InterfaceAuthenticationDatabaseService } from "../interface-authentication-database.service";
import { PlayerDto } from "../../models/dto/player.dto";
import { SignupDto } from "../../models/dto/signup.dto";

export const authenticationNeo4jService: InterfaceAuthenticationDatabaseService =
  {
    loginPlayer(email: string): Promise<PlayerDto | null> {
      throw Error("not implemented");
    },
    signupPlayer(signupDto: SignupDto): Promise<PlayerDto | null> {
      throw Error("not implemented");
    },
  };
