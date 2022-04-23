/**
 * Used to pass in an object ot repository service for determining the db to use
 */
// NOTE: Where to put this one
export interface InterfaceRepository {
  MySQL: any,
  MongoDB: any,
  Neo4j: any
}