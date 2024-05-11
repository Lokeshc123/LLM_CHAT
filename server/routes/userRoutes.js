const express = require("express");
const router = express.Router();

const { register, login, getUsers } = require("../controller/UserController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getUsers").get(getUsers);

module.exports = router;
