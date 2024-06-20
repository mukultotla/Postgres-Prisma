import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://postgres:postgres@localhost:5432/postgres?sslmode=disable",
});

async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
       CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
       )
    `);
  console.log(result);
}

async function insertRow() {
  try {
    await client.connect();
    const query =
      "INSERT INTO users(username, email, password) VALUES('mukultot', 'mukultotla1@gmail.com', 'mukul123')";
    const result = await client.query(query);
    console.log("Insertion successful -> ", result);
  } catch (err) {
    console.error("Error during insertion : ", err);
  } finally {
    client.end();
  }
}

// createUsersTable();
insertRow();
