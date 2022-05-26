import { InterfaceAuthenticationDatabaseService } from "../interface-authentication-database.service";
import { PlayerDto } from "../../models/dto/player.dto";
import { SignupDto } from "../../models/dto/signup.dto";
import { authenticationNeo4jRepository } from "../../repositories/neo4j/authentication.neo4j.repository";

export const authenticationNeo4jService: InterfaceAuthenticationDatabaseService =
  {
    loginPlayer(email: string): Promise<PlayerDto | null> {
      const emailValidation =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailValidation.test(email)) {
        return authenticationNeo4jRepository.loginPlayer(email);
      } else throw Error("invalid email address");
    },
    async signupPlayer(signupDto: SignupDto): Promise<PlayerDto | null> {
      const player = await this.loginPlayer(signupDto.email);
      if (player) throw Error("Email already been used");
      //Saga pattern to check for only single email is exist in player
      else return authenticationNeo4jRepository.signupPlayer(signupDto);
    },
  };
