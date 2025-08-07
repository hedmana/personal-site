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
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// CORS setup
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://personal-site-theta-woad.vercel.app",
      ]
    : ["http://localhost:3000", process.env.CORS_ORIGIN];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin))
        return callback(null, true);
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

  const message =
    process.env.NODE_ENV === "production"
      ? "Server Error"
      : err.message || "Server Error";

  res.status(status).json({ message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
