// db.js
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Railway
  },
});

module.exports = pool;
