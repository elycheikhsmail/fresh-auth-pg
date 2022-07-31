import * as postgres from "https://deno.land/x/postgres@v0.16.1/mod.ts";
const databaseUrl = Deno.env.get("DATABASE_URL")!;
export const pool = new postgres.Pool(databaseUrl, 1, true);
