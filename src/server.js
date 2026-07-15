const app = require("./app");
const env = require("./config/env");
const connectDatabase = require("./config/database");

const startServer = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server is running on http://localhost:${env.port}`);
  });
};

startServer();
