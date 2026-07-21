const User = require("../models/User");
const AppError = require("../utils/AppError");
const { generateToken } = require("../utils/jwt");

const registerUser = async ({ name, email, password }) => {
  // Check if email already exists
  const existingUser = await User.findByEmail(email);

  if (existingUser) {
    throw new AppError("Email is already registered.", 409);
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  // Find user by email
  const user = await User.findByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  // Compare password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password.", 401);
  }
  const token = generateToken(user._id);

  return {
    user,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
