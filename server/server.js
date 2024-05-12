const { app, server } = require("./app");

const dotenv = require("dotenv");
const connectDb = require("./config/database");

dotenv.config({ path: "server/config/.env" });

connectDb();

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
