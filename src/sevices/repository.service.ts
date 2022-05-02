import { Databases } from "../global/database-control";
import {
  DatabaseService,
  SERVICES,
} from "../repositories/database-registry.repository";

/**
 * Selects which repository to use based on the current database.
 *
 * @returns Mysql, MongoDB or Neo4j object with their corresponding repositories
 * @param databases
 */
export function switchSelectDatabaseService(
  databases: Databases
): DatabaseService {
  switch (databases) {
    case Databases.MySQL:
      return SERVICES.MySQL;
    case Databases.MongoDB:
    // Note: Not implemented yet
    // return repositories.MongoDB;
    case Databases.Neo4j:
    // Note: Not implemented yet
    // return repositories.Neo4j;
    default:
      throw Error(
        `No Database was implemented for what has been selected: type of repository object: ${databases}`
      );
  }
}
