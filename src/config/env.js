require("dotenv").config();

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
