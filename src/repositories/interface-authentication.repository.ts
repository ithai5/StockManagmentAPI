import { PlayerDto } from "../models/dto/player.dto";
import { SignupDto } from "../models/dto/signup.dto";

export interface InterfaceAuthentication {
  loginPlayer: (email: string) => Promise<PlayerDto | null>;
  signupPlayer: (signupDto: SignupDto) => Promise<PlayerDto | null>;
}
