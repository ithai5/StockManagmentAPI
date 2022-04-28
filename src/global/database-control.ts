export enum databases {
  MySQL = "MySQL",
  MongoDB = "MongoDB",
  Neo4j = "Neo4j"
}

/**
 * Can't set this as a constant otherwise the checks don't work in the services.
 * Because if it is a constant, it doesn't see the need for a switch statement to check it.
 */
export let currentDatabase = databases.MySQL;

