import neo4j from "neo4j-driver";
import "dotenv/config";

const { NEO4J_URL, NEO4J_PASSWORD, NEO4J_USERNAME } = process.env;

const neo4jDatabaseConnection = neo4j.driver(
  NEO4J_URL!,
  neo4j.auth.basic(NEO4J_USERNAME!, NEO4J_PASSWORD!),
  { disableLosslessIntegers: true } // take under consideration that the numbers will not be too big
);

export const neo4jConnection = async (sanitizedQuery: string, params?: any) => {
  const session = neo4jDatabaseConnection.session();
  try {
    return await session.run(sanitizedQuery, params);
  } catch (error) {
    console.error(error);
    throw Error("connection failed");
  } finally {
    await session.close();
  }
  await neo4jDatabaseConnection.close();
};