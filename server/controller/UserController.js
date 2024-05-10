const User = require("../modal/User");
const sendToken = require("../utils/token");
const bcrypt = require("bcryptjs");

// Register a new user

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    sendToken(newUser, 200, res);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    sendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { register, login };
