const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const env = require("../config/env");

const healthCheck = asyncHandler(async (req, res) => {
  const response = new ApiResponse(true, "Server is healthy.", {
    status: "UP",
    environment: env.nodeEnv,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "v1",
  });

  res.status(200).json(response);
});

module.exports = {
  healthCheck,
};
