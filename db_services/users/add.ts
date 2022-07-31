import * as postgres from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import * as logger from "https://deno.land/std@0.149.0/log/mod.ts";
import { IUser } from "../../interfaces/mod.ts";

const databaseUrl = Deno.env.get("DATABASE_URL")!;
const pool = new postgres.Pool(databaseUrl, 3, true);
const client = await pool.connect();

export async function createUser(user: IUser) {
  try {
    const result = await client.queryObject(
      `
        INSERT INTO users
        (username, password)
        VALUES ( $username, $password)
        `,
      {
        username: user.username,
        password: user.password,
      },
    );
    return result;
  } catch (e) {
    logger.error(e);
  } finally {
    client.release();
  }
}

//await createUser({ username: "ely1", password: "1234" });
