import { currentDatabase, databases } from "../global/database-control";
import { InterfaceRepository } from "../repositories/interface-repository";



/**
 * Selects which repository to use based on the current database.
 * 
 * @param repositories - Object with MySQL, MongoDB, and Neo4j Repository implementations
 * @returns The implemented repository for the current database.
 */
export function switchSelectRepository <T> (repositories: InterfaceRepository, objectOfTypeOfRepository: T): T {
  switch (currentDatabase) {
    case databases.MySQL:
      return repositories.MySQL;
    case databases.MongoDB:
      // TODO: Not implemented yet
      // return repositories.MongoDB;
    case databases.Neo4j:
      // TODO: Not implemented yet
      // return repositories.Neo4j;
    default:
      throw Error(`No Database was implemented for what has been selected: type of repository object: ${objectOfTypeOfRepository}`)
  }
}
