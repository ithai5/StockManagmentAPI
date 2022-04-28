import { Databases } from "../global/database-control";
import {
  DatabaseRepository,
  REPOSITORIES,
} from "../repositories/database-registry.repository";

/**
 * Selects which repository to use based on the current database.
 *
 * @returns The implemented repository for the current database.
 * @param databases
 */
export function switchSelectRepository(
  databases: Databases
): DatabaseRepository {
  switch (databases) {
    case Databases.MySQL:
      return REPOSITORIES.MySQL;
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
