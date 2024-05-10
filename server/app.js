const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const app = express();
const user = require("./routes/userRoutes");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", user);
module.exports = app;
