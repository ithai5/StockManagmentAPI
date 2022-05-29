import { InterfaceAuthenticationDatabaseService } from "../interface-authentication-database.service";
import { PlayerDto } from "../../models/dto/player.dto";
import { authenticationMySqlRepository } from "../../repositories/mysql/authentication.mysql.repository";
import { SignupDto } from "../../models/dto/signup.dto";

export const authenticationMySqlService: InterfaceAuthenticationDatabaseService =
  {
    loginPlayer(email: string): Promise<PlayerDto | null> {
      return authenticationMySqlRepository.loginPlayer(email);
    },
    signupPlayer(signupDto: SignupDto): Promise<PlayerDto | null> {
      console.log(signupDto.playerId.replace("-", ""));
      return authenticationMySqlRepository.signupPlayer({
        ...signupDto,
        playerId: signupDto.playerId.replace("-", ""),
      });
    },
  };
