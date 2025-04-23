// backend/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';  // ✅ ต้องไม่ลืมอันนี้
import bcrypt from 'bcryptjs';

let db;

export async function initializeDatabase() {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'admin'
    )
  `);

  const admin = await db.get(`SELECT * FROM users WHERE username = 'admin'`);
  if (!admin) {
    const hashedPassword = await bcrypt.hash('123456', 10);
    await db.run(
      `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
      ['admin', hashedPassword, 'admin']
    );
    console.log('✔️ Admin account created: username=admin password=123456');
  }

  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending'
    );
  `);

  console.log('📦 SQLite database initialized');
}

export function getDb() {
  return db;
}
