const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const AppError = require("../utils/AppError");
const authService = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError("Name, email and password are required.", 400);
  }

  const user = await authService.registerUser({
    name,
    email,
    password,
  });

  const response = new ApiResponse(true, "User registered successfully.", user.getPublicProfile());

  res.status(201).json(response);
});

module.exports = {
  register,
};
