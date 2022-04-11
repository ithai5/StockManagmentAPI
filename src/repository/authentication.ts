import { PlayerDto } from "../models/playerDto";

export interface Authentication {
  loginPlayer: (email: string) => Promise<PlayerDto | null>;
}
