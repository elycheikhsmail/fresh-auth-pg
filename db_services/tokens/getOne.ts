import * as postgres from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import * as logger from "https://deno.land/std@0.149.0/log/mod.ts";

const databaseUrl = Deno.env.get("DATABASE_URL")!;
const pool = new postgres.Pool(databaseUrl, 3, true);
const client = await pool.connect();

export async function getTokens(token: string): Promise<any[] | void> {
  try {
    const result = await client.queryObject(
      `
      SELECT * FROM tokens
      WHERE token = $token 
      `,
      {
        token,
      },
    );
    console.log("get tokens from db");
    return result.rows;
  } catch (e) {
    logger.error(e);
  } finally {
    client.release();
  }
}

// const token = "0d93345f-88ee-4695-82f4-4b5f9c2adae1"
// const result = await getTokens(token)
// console.log(result)

// deno run --allow-all  db_services/tokens/getOne.ts
