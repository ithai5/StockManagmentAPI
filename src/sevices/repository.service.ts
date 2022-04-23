import { currentDatabase, databases } from "../global/database-control";
import { logger } from "../global/logger";
import { InterfaceRepository } from "../repositories/interface-repository";

// To do : 

/**
 * Selects which repository to use based on the current database.
 * 
 * @param repositories - Object with MySQL, MongoDB, and Neo4j Repository implementations
 * @returns The implemented repository for the current database.
 */
export const switchSelectRepository = (repositories: InterfaceRepository): unknown => {
  let resultRepository!: InterfaceRepository;
  switch (currentDatabase) {
    case databases.MySQL:
      console.log("MySQL is selected as current database");
      resultRepository = repositories.MySQL;
      break;
    case databases.MongoDB:
      console.log("MongoDB is selected as current database");
      // Not implemented yet
      resultRepository = repositories.MongoDB;
      break;
    case databases.Neo4j:
      console.log("Neo4j is selected as current database");
      // Not implemented yet
      resultRepository = repositories.Neo4j;
      break;
    default:
      console.log("Default chosen which is MySQL");
      return repositories.MySQL;
  }

  // This check might not be needed when we've implemented the other databases
  if(resultRepository === undefined || resultRepository === null) {
    /**
     * NOTE:
     * - Decide if we want to have a fallback on MySQL if undefined, for example create/update/delete in the wrong db, etc.
     */
    // Loggin a warning with temp logging solution while we don't have a logger:
    var path = require('path');
    var scriptName = path.basename(__filename);
    let loggerMessage = 
      'We have an undefined or null repository selected,' 
      + '\ncurrentDatabase is: ' + currentDatabase 
      + '\nrepositories.MySQL as a fallback is: ' + repositories.MySQL;
    logger('Warning', loggerMessage, scriptName);

    // Setting MySQL as the default:
    resultRepository = repositories.MySQL;
  }

  return resultRepository;
}