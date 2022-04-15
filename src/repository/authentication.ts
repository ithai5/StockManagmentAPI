import { SignupDto } from "../models/signupDto";
import { PlayerDto } from "../models/playerDto";

export interface Authentication {
  loginPlayer: (email: string) => Promise<PlayerDto | null>;
  signupPlayer: (signupDto: SignupDto) => Promise<PlayerDto>;
}
