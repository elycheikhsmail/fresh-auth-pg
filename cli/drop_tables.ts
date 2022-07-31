import * as postgres from "https://deno.land/x/postgres@v0.16.1/mod.ts";

export async function drop_table_users(pool: postgres.Pool) {
  const connection = await pool.connect();
  try {
    // Create the table
    await connection.queryObject`DROP TABLE users`;
    console.log("table users deleted");
  } finally {
    connection.release();
  }
}

export async function drop_table_articles(pool: postgres.Pool) {
  const connection = await pool.connect();
  try {
    await connection.queryObject`DROP TABLE articles`;
    console.log("table articles deleted");
  } finally {
    connection.release();
  }
}

export async function drop_table_tokens(pool: postgres.Pool) {
  const connection = await pool.connect();
  try {
    await connection.queryObject`DROP TABLE tokens`;
    console.log("table tokens deleted");
  } finally {
    connection.release();
  }
}
