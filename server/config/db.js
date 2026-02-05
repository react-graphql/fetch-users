import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = await open({
  filename: "./src/database.db",
  driver: sqlite3.Database,
});

// Create table if it doesn't exist
await db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER,
    isActive INTEGER DEFAULT 0
  )
`);

console.log("✅ SQLite connected & users table ready");
