const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const testError = asyncHandler(async (req, res) => {
  throw new AppError("Async Handler is working!", 400);
});

module.exports = {
  testError,
};
