const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const testSuccess = asyncHandler(async (req, res) => {
  const response = new ApiResponse(true, "API is working successfully.", {
    project: "E-commerce REST API",
    version: "v1",
  });

  res.status(200).json(response);
});

module.exports = {
  testSuccess,
};
