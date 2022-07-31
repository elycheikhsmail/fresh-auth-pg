import "https://deno.land/std@0.149.0/dotenv/load.ts";
import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

const client = new Client({
  hostname: Deno.env.get("DB_HOST"),
  port: 5432,
  //
  user: Deno.env.get("DB_USERNAME"),
  password: Deno.env.get("DB_PASSWORD"),
  //
  database: Deno.env.get("DB_NAME"),
});

interface IUser {
  username: string;
  password: string;
}

async function createUser(user: IUser) {
  await client.connect();
  await client.queryObject(
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

  await client.end();
}

await createUser({ username: "ely", password: "1234" });
