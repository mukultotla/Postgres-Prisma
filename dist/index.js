"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://postgres:postgres@localhost:5432/postgres?sslmode=disable",
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`
       CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
       )
    `);
        console.log(result);
    });
}
function insertRow(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            // Use parameterized query to prevent SQL Injection
            const insertQuery = "INSERT INTO users(username, email, password) VALUES($1, $2, $3)";
            const values = [username, email, password];
            const result = yield client.query(insertQuery, values);
            console.log("Insertion successful -> ", result);
        }
        catch (err) {
            console.error("Error during insertion : ", err);
        }
        finally {
            client.end();
        }
    });
}
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            yield client.connect();
            const query = "SELECT * FROM users where email = $1";
            const values = [email];
            const result = yield client.query(query, values);
            if (((_a = result === null || result === void 0 ? void 0 : result.rows) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                console.log("User found -> ", result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log("No user found with given email id");
                return null;
            }
        }
        catch (error) {
            console.error("Error while getting user data -> ", error);
        }
        finally {
            yield client.end();
        }
    });
}
// createUsersTable();
// insertRow("testuse", "testusr@gmail.com", "12345");
getUser("testur@gmail.com");
