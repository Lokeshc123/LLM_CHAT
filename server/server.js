const { app, server } = require("./app");
const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/database");
const user = require("./routes/userRoutes");
const message = require("./routes/messageRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config({ path: "server/config/.env" });

connectDb();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", user);
app.use("/api/v1", message);
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
