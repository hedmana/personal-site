// routes/posts.js
const express = require("express");
const slugify = require("slugify");
const pool = require("../db");

const router = express.Router();

// POST (admin only)
router.post("/", authenticateToken, requireAdmin, async (req, res) => {
  const { title, date, content } = req.body;

  try {
    const generatedSlug = slugify(title, { lower: true, strict: true });
    const result = await pool.query(
      `INSERT INTO posts (title, slug, date, content, author_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, generatedSlug, date, content, req.user.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Post creation error:", err);
    res.status(500).json({ message: "Error creating post" });
  }
});

// GET (all posts)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while fetching posts");
  }
});

// GET (single post by slug)
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await pool.query("SELECT * FROM posts WHERE slug = $1", [
      slug,
    ]);
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while fetching post");
  }
});

module.exports = router;
