const mongoose = require("mongoose");
const env = require("./env");

// Connection Events
mongoose.connection.on("connected", () => {
  console.log("🟢 MongoDB connected.");
});

mongoose.connection.on("error", (error) => {
  console.error("🔴 MongoDB error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("🟡 MongoDB disconnected.");
});

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB.");
    console.error(error.message);
    process.exit(1);
  }
};

// Graceful Shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🛑 MongoDB connection closed.");
  process.exit(0);
});

module.exports = connectDatabase;
