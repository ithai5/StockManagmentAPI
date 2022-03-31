import mysql from "mysql2/promise";
import "dotenv/config";
const pool = mysql.createPool({
  /*Checks about connection limit thingy*/
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export const mysqlQuery = {
  query: <T>(queryText: string, type: T, params?: string) =>
    pool.query<[T, any]>(queryText, params),
};
