import * as postgres from "https://deno.land/x/postgres@v0.16.1/mod.ts";

export async function create_table_users(pool: postgres.Pool) {
  const connection = await pool.connect();
  try {
    // Create the table
    await connection.queryObject`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `;
    // replace consol log by std/logger
    console.log("table users created");
  } finally {
    // Release the connection back into the pool
    connection.release();
  }
}

export async function create_table_articles(pool: postgres.Pool) {
  const connection = await pool.connect();
  try {
    // Create the table
    await connection.queryObject`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        categorie Int NOT NULL,
        subcategorie Int  NOT NULL,
        lieu Int  NOT NULL,
        description TEXT  NOT NULL,
        prix Int  NOT NULL,
        dateAdd TEXT  NOT NULL
      )
    `;
    // replace consol log by std/logger
    console.log("table articles created");
  } finally {
    // Release the connection back into the pool
    connection.release();
  }
}

export async function create_table_tokens(pool: postgres.Pool) {
  const connection = await pool.connect();
  try {
    // Create the table
    await connection.queryObject`
      CREATE TABLE IF NOT EXISTS tokens (
        id SERIAL PRIMARY KEY,
        userId Int NOT NULL,
        token TEXT NOT NULL,
        expire_date Int  NOT NULL,  
        isActive Int  NOT NULL
      )
    `;
    // replace consol log by std/logger
    console.log("table tokens created");
  } finally {
    // Release the connection back into the pool
    connection.release();
  }
}
