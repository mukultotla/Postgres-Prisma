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

async function insertRow(username: string, email: string, password: string) {
  try {
    await client.connect();
    // Use parameterized query to prevent SQL Injection
    const insertQuery =
      "INSERT INTO users(username, email, password) VALUES($1, $2, $3)";
    const values = [username, email, password];
    const result = await client.query(insertQuery, values);
    console.log("Insertion successful -> ", result);
  } catch (err) {
    console.error("Error during insertion : ", err);
  } finally {
    client.end();
  }
}

async function getUser(email: string) {
  try {
    await client.connect();
    const query = "SELECT * FROM users where email = $1";
    const values = [email];
    const result = await client.query(query, values);
    if (result?.rows?.length > 0) {
      console.log("User found -> ", result.rows[0]);
      return result.rows[0];
    } else {
      console.log("No user found with given email id");
      return null;
    }
  } catch (error) {
    console.error("Error while getting user data -> ", error);
  } finally {
    await client.end();
  }
}
// createUsersTable();
// insertRow("testuse", "testusr@gmail.com", "12345");
getUser("testur@gmail.com");
