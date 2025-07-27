require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/clients", require("./routes/clients"));

app.use("/api/projects", require("./routes/projects"));

// Error handler (should be last)
app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = app;
