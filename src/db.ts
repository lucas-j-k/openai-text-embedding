import { Pool } from "pg";
import { ISearchDBService, CompanySQLResult } from "./types";

export const connect = async (): Promise<Pool> => {
  const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
    port: parseInt(process.env.PG_PORT || '5432', 10),
  });
  return pool;
};

/**
 * Wrapper around db interactions for company search
 */
export class PostgresSearchService implements ISearchDBService {
  dbPool: Pool;

  constructor(pool: Pool) {
    this.dbPool = pool;
  }

  searchCompanies = async (vector: number[]) => {

    const formatted = "[" + vector.join() + "]";

    // query for nearest vector embeddings by cosine similarity
    const { rows } = await this.dbPool.query<CompanySQLResult>(
      "SELECT * FROM company ORDER BY embedding <=> $1 LIMIT 3;",
      [formatted]
    );
    return rows;
  };
}

export default connect;
