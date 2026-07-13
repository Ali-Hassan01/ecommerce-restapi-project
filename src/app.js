const express = require("express");

const app = express();

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the E-commerce REST API",
  });
});

module.exports = app;
