// routes/posts.js
const express = require("express");
const slugify = require("slugify");
const pool = require("../db");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

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
    const result = await pool.query(`
      SELECT p.*, COUNT(l.*) AS like_count
      FROM posts p
      LEFT JOIN likes l ON p.id = l.post_id
      GROUP BY p.id
      ORDER BY p.date DESC
    `);
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
    const result = await pool.query(
      `
      SELECT p.*, COUNT(l.*) AS like_count
      FROM posts p
      LEFT JOIN likes l ON p.id = l.post_id
      WHERE p.slug = $1
      GROUP BY p.id
      `,
      [slug]
    );
    if (result.rows.length === 0) return res.status(404).send("Not found");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while fetching post");
  }
});

// GET like count & whether current user liked this post
router.get("/:slug/likes", authenticateToken, async (req, res, next) => {
  try {
    const { slug } = req.params;
    const userId = req.user.userId;

    const postRes = await pool.query("SELECT id FROM posts WHERE slug = $1", [
      slug,
    ]);
    if (!postRes.rows[0])
      return res.status(404).json({ message: "Post not found" });
    const postId = postRes.rows[0].id;

    const countRes = await pool.query(
      "SELECT COUNT(*) FROM likes WHERE post_id = $1",
      [postId]
    );
    const likedRes = await pool.query(
      "SELECT 1 FROM likes WHERE post_id = $1 AND user_id = $2",
      [postId, userId]
    );

    res.json({
      count: parseInt(countRes.rows[0].count, 10),
      liked: likedRes.rows.length > 0,
    });
  } catch (err) {
    next(err);
  }
});

// POST toggle like
router.post("/:slug/likes", authenticateToken, async (req, res, next) => {
  try {
    const { slug } = req.params;
    const userId = req.user.userId;

    const postRes = await pool.query("SELECT id FROM posts WHERE slug = $1", [
      slug,
    ]);
    if (!postRes.rows[0])
      return res.status(404).json({ message: "Post not found" });
    const postId = postRes.rows[0].id;

    // Try delete first (unlike)
    const del = await pool.query(
      "DELETE FROM likes WHERE post_id = $1 AND user_id = $2 RETURNING *",
      [postId, userId]
    );
    if (del.rows.length > 0) {
      // was unliked
      const countRes = await pool.query(
        "SELECT COUNT(*) FROM likes WHERE post_id = $1",
        [postId]
      );
      return res.json({
        liked: false,
        count: parseInt(countRes.rows[0].count, 10),
      });
    }

    // else insert like
    await pool.query("INSERT INTO likes (post_id, user_id) VALUES ($1, $2)", [
      postId,
      userId,
    ]);
    const countRes = await pool.query(
      "SELECT COUNT(*) FROM likes WHERE post_id = $1",
      [postId]
    );
    res.json({ liked: true, count: parseInt(countRes.rows[0].count, 10) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
