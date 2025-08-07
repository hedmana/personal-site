require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");

const app = express();

// Middlewares
app.use(helmet());
app.use(morgan("tiny"));

// CORS setup
const whitelist = [process.env.CORS_ORIGIN || "http://localhost:3000"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// API routes
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
