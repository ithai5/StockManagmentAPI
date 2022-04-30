import { switchSelectRepository } from "./repository.service";
import { Databases } from "../global/database-control";

const {} = switchSelectRepository(Databases.MySQL);