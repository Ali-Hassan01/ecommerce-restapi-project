const express = require("express");
const routes = require("./routes");
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

app.use("/api", routes);

module.exports = app;
