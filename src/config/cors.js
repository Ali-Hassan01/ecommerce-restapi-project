const cors = require("cors");
const env = require("./env");

const corsOptions = {
  origin: env.nodeEnv === "development" ? "*" : ["https://yourfrontend.com"],

  credentials: true,
};

module.exports = cors(corsOptions);
