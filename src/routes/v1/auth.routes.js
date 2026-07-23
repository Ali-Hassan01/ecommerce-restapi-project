const express = require("express");
const { register, login, me, updateProfile } = require("../../controllers/auth.controller");
const { protect, authorize } = require("../../middlewares/auth.middleware");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.patch("/profile", protect, updateProfile);
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin!",
  });
});
module.exports = router;
