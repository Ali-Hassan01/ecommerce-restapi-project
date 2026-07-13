const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:5173", // React Customer App
    "http://localhost:5174", // React Admin Dashboard
  ],
  credentials: true,
};

module.exports = cors(corsOptions);
