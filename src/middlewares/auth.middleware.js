const jwt = require("jsonwebtoken");

const env = require("../config/env");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No token
  if (!token) {
    throw new AppError("Authentication required.", 401);
  }

  // Verify token
  const decoded = jwt.verify(token, env.jwtSecret);

  // Find user
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("User no longer exists.", 401);
  }

  // Attach user to request
  req.user = user;

  next();
});

module.exports = {
  protect,
};
