import { SignupDto } from "../models/dto/signup.dto";
import { PlayerDto } from "../models/dto/player.dto";

export interface InterfaceAuthenticationDatabaseService {
  signupPlayer: (signupDto: SignupDto) => Promise<PlayerDto | null>;
  loginPlayer: (email: string) => Promise<PlayerDto | null>;
}
