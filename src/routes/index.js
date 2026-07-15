const express = require("express");
const healthRoutes = require("./health.routes");
const v1Routes = require("./v1");

const router = express.Router();

router.use("/v1", v1Routes);
router.use("/health", healthRoutes);
module.exports = router;
