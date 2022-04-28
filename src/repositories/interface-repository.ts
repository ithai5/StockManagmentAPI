/**
 * Used to pass in an object ot repository service for determining the db to use
 */
import { DatabaseRepository } from "./database-registry.repository";

// NOTE: Where to put this one
export interface InterfaceRepository {
  MySQL: DatabaseRepository;
  MongoDB: unknown;
  Neo4j: unknown;
}
