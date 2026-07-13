const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API v1 is running successfully.",
  });
});

router.get("/error", (req, res, next) => {
  next(new Error("Testing global error handler"));
});

module.exports = router;
