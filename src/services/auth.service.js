const User = require("../models/User");
const AppError = require("../utils/AppError");
const { generateToken } = require("../utils/jwt");
const filterObject = require("../utils/filterObject");
const crypto = require("crypto");

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

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return user;
};

const updateProfile = async (userId, updateData) => {
  const filteredData = filterObject(updateData, "name", "phone", "avatar");

  const user = await User.findByIdAndUpdate(userId, filteredData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return user;
};

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isCurrentPasswordCorrect) {
    throw new AppError("Current password is incorrect.", 401);
  }

  const isSamePassword = await user.comparePassword(newPassword);

  if (isSamePassword) {
    throw new AppError("New password must be different from the current password.", 400);
  }

  user.password = newPassword;

  // pre("save") middleware will hash it automatically
  await user.save();

  const token = generateToken(user._id);

  return {
    user,
    token,
  };
};
const forgotPassword = async (email) => {
  const user = await User.findByEmail(email);

  if (!user) {
    throw new AppError("No user found with that email.", 404);
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({
    validateBeforeSave: false,
  });

  return resetToken;
};

const resetPassword = async (token, newPassword) => {
  // Hash incoming token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find matching user
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new AppError("Reset token is invalid or has expired.", 400);
  }

  // Update password
  user.password = newPassword;

  // Remove reset fields
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  // Triggers pre("save") -> bcrypt hash
  await user.save();

  // Issue fresh JWT
  const tokenJwt = generateToken(user._id);

  return {
    user,
    token: tokenJwt,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
};
