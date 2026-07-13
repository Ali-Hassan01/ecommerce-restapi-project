const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");
const helmet = require("helmet");
const requestLogger = require("./middlewares/requestLogger");
const logger = require("./config/logger");
const corsMiddleware = require("./config/cors");

const ApiResponse = require("./utils/apiResponse");

const app = express();

// Security headers
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(corsMiddleware);

// Logging
app.use(logger);

// Built-in middleware
app.use(express.json());

// Custom middleware
app.use(requestLogger);

app.use("/api", routes);

// Error Handler (must be last)
app.use(errorHandler);

module.exports = app;
