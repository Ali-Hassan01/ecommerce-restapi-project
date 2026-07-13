const morgan = require("morgan");
const env = require("./env");

const logger = env.nodeEnv === "development" ? morgan("dev") : morgan("combined");

module.exports = logger;
