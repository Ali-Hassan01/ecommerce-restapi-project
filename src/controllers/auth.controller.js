const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const AppError = require("../utils/AppError");

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError("Name, email and password are required.", 400);
  }

  const response = new ApiResponse(true, "Validation successful.", {
    name,
    email,
  });

  res.status(200).json(response);
});

module.exports = {
  register,
};
