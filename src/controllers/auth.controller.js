const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Register endpoint is working.",
  });
});

module.exports = {
  register,
};
