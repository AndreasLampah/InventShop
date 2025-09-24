// import dan konfigurasi dari file .env
const dotenv = require("dotenv");
dotenv.config();

// import/settingan umum
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
// path ke routes
const ApiRoutes = require("./routes/ApiRoutes.js");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// import dari file .env
const PORT = process.env.PORT;

// api routes
app.use(ApiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
