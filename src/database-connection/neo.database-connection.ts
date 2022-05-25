import neo4j from "neo4j-driver";
import "dotenv/config";

const { NEO4J_URL, NEO4J_PASSWORD, NEO4J_USERNAME } = process.env;

const neoDatabaseConnection = neo4j.driver(
  NEO4J_URL!,
  neo4j.auth.basic(NEO4J_USERNAME!, NEO4J_PASSWORD!)
);

export const neo4jConnection = async (sanitizedQuery: string) => {
  const session = neoDatabaseConnection.session();
  try {
    const result = await session.run(sanitizedQuery);
    return result.records;
  } catch (error) {
    throw Error;
  } finally {
    await session.close();
  }
  await neoDatabaseConnection.close();
};
