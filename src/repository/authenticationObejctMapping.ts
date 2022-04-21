import { SignupDto } from "../models/signupDto";
import { PlayerDto } from "../models/playerDto";

export interface AuthenticationObejctMapping {
  loginPlayer: (email: string) => Promise<PlayerDto | null>;
  signupPlayer: (signupDto: SignupDto) => Promise<PlayerDto>;
}
