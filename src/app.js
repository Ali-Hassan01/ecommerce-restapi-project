const express = require("express");
const helmet = require("helmet");
const corsMiddleware = require("./config/cors");
const rateLimiter = require("./config/rateLimiter");
const logger = require("./config/logger");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Security Headers
app.use(helmet());

// CORS
app.use(corsMiddleware);

// HTTP Request Logger
app.use(logger);

// rate limiter middlware
app.use(rateLimiter);

// Parse JSON Bodies
app.use(express.json());

// API Routes
app.use("/api", routes);

// Global Error Handler (must be last)
app.use(errorHandler);

module.exports = app;
