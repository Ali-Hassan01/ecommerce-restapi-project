const User = require("../models/User");
const AppError = require("../utils/AppError");

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

module.exports = {
  registerUser,
};
