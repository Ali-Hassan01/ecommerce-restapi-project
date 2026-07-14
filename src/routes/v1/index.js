const express = require("express");
const AppError = require("../../utils/AppError");

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");
const categoryRoutes = require("./category.routes");
const brandRoutes = require("./brand.routes");
const cartRoutes = require("./cart.routes");
const orderRoutes = require("./order.routes");
const reviewRoutes = require("./review.routes");
const couponRoutes = require("./coupon.routes");

const router = express.Router();

// Version 1 Root
// router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "API v1 is running successfully.",
//   });
// });

router.get("/", (req, res, next) => {
  next(new AppError("Testing AppError", 404));
});

// Feature Routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/brands", brandRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/reviews", reviewRoutes);
router.use("/coupons", couponRoutes);

module.exports = router;
