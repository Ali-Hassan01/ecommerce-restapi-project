const express = require("express");
const requestLogger = require("./middlewares/requestLogger");
const logger = require("./config/logger");

const ApiResponse = require("./utils/apiResponse");

const app = express();

// Logging
app.use(logger);

// Built-in middleware
app.use(express.json());

// Custom middleware
app.use(requestLogger);

// Test Route
app.get("/", (req, res) => {
  const response = new ApiResponse(true, "Welcome to the E-commerce REST API");

  res.status(200).json(response);
});

module.exports = app;
