// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Blog backend running at http://localhost:${PORT}`);
});
