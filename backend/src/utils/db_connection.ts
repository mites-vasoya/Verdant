import { Pool, PoolClient } from 'pg';

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'verdant',
  password: 'admin',
  port: 5432,
});

async function getConnection(): Promise<PoolClient> {
  return await pool.connect();
}

export { getConnection };
