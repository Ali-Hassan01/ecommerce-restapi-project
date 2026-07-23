const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const AppError = require("../utils/AppError");
const authService = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError("Name, email and password are required.", 400);
  }

  const { user, verificationToken } = await authService.registerUser({
    name,
    email,
    password,
  });

  const response = new ApiResponse(true, "User registered successfully.", {
    user: user.getPublicProfile(),
    verificationToken,
  });

  res.status(201).json(response);
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await authService.verifyEmail(token);

  res
    .status(200)
    .json(new ApiResponse(true, "Email verified successfully.", user.getPublicProfile()));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required.", 400);
  }

  const { user, token } = await authService.loginUser({
    email,
    password,
  });

  const response = new ApiResponse(true, "Login successful.", {
    user: user.getPublicProfile(),
    token,
  });

  res.status(200).json(response);
});

const me = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user._id);

  const response = new ApiResponse(true, "Profile fetched successfully.", user.getPublicProfile());

  res.status(200).json(response);
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user._id, req.body);

  const response = new ApiResponse(true, "Profile updated successfully.", user.getPublicProfile());

  res.status(200).json(response);
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new AppError("Current password and new password are required.", 400);
  }

  const { user, token } = await authService.changePassword(
    req.user._id,
    currentPassword,
    newPassword
  );

  const response = new ApiResponse(true, "Password changed successfully.", {
    user: user.getPublicProfile(),
    token,
  });

  res.status(200).json(response);
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError("Email is required.", 400);
  }

  const resetToken = await authService.forgotPassword(email);

  const response = new ApiResponse(true, "Password reset token generated.", {
    resetToken,
  });

  res.status(200).json(response);
});
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    throw new AppError("New password is required.", 400);
  }

  const result = await authService.resetPassword(token, newPassword);

  const response = new ApiResponse(true, "Password reset successfully.", {
    user: result.user.getPublicProfile(),
    token: result.token,
  });

  res.status(200).json(response);
});
module.exports = {
  register,
  login,
  me,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
