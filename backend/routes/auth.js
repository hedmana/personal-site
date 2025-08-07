// backend/routes/auth.js
const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// POST /signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existing = await pool.query("SELECT 1 FROM users WHERE username = $1", [
    username,
  ]);
  if (existing.rows.length > 0) {
    const err = new Error("User already exists");
    err.statusCode = 400;
    throw err;
  }

  // Validate password
  if (password.length < 5) {
    const err = new Error("Password must be at least 5 characters long");
    err.statusCode = 400;
    throw err;
  }

  // Hash + insert
  const hashed = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (username, password_hash, role, created_at)
     VALUES ($1, $2, 'user', NOW())
     RETURNING id, role, created_at`,
    [username, hashed]
  );

  res.status(201).json(result.rows[0]);
});

// POST /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  const userRes = await pool.query(
    "SELECT id, password_hash, role FROM users WHERE username = $1",
    [username]
  );
  if (userRes.rows.length === 0) {
    const err = new Error("User not found");
    err.statusCode = 400;
    throw err;
  }

  const user = userRes.rows[0];
  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    const err = new Error("Incorrect password");
    err.statusCode = 400;
    throw err;
  }

  // Generate JWT
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
});

// GET /me — return current user info
router.get(
  "/me",
  authenticateToken, // parses & verifies JWT
  async (req, res, next) => {
    try {
      const result = await pool.query(
        "SELECT id, username, role FROM users WHERE id = $1",
        [req.user.userId]
      );
      if (result.rows.length === 0) {
        return res.sendStatus(404);
      }
      res.json(result.rows[0]);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
