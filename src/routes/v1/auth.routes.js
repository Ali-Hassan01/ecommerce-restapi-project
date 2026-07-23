const express = require("express");
const {
  register,
  login,
  me,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
} = require("../../controllers/auth.controller");
const { protect, authorize } = require("../../middlewares/auth.middleware");

const router = express.Router();
router.post("/register", register);
router.patch("/verify-email/:token", verifyEmail);
router.post("/login", login);
router.get("/me", protect, me);
router.patch("/profile", protect, updateProfile);
router.patch("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin!",
  });
});

module.exports = router;
