const express = require("express");

const helmet = require("helmet");
const logger = require("./config/logger");
const routes = require("./routes");

const app = express();

// Security Headers
app.use(helmet());

// HTTP Request Logger
app.use(logger);

// Parse JSON Bodies
app.use(express.json());

// API Routes
app.use("/api", routes);

module.exports = app;
