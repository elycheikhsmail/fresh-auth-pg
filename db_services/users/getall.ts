import * as postgres from "https://deno.land/x/postgres@v0.16.1/mod.ts";

import * as logger from "https://deno.land/std@0.149.0/log/mod.ts";

const databaseUrl = Deno.env.get("DATABASE_URL")!;
const pool = new postgres.Pool(databaseUrl, 3, true);
const client = await pool.connect();

export async function getUserAll( ): Promise<any[] | void> {
  try {
    const users = await client.queryObject(
      `
        SELECT * FROM users 
        `
    );
    console.log(users.rows);
    return users.rows;
  } catch (e) {
    logger.error(e);
  } finally {
    client.release();
  }
}

//await getUserByName("ely");
await getUserAll()
// deno run --allow-all db_services/users/getall.ts