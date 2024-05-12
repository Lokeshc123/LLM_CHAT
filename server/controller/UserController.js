const User = require("../model/User");
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

// Get all users expect the logged in user

const getUsers = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.query;
    console.log(id);
    const users = await User.find({ _id: { $ne: id } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//get user details

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// send friend request

const sendFriendRequest = async (req, res) => {
  try {
    const { id, friendId } = req.body;
    const user = await User.findByIdAndUpdate(id, {
      $push: {
        sentrequests: friendId,
      },
    });

    const friend = await User.findByIdAndUpdate(friendId, {
      $push: { recievedrequests: id },
    });
    res.json({ user, friend });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// Get all friend requests
const getFriendRequests = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (!user.recievedrequests) {
      return res.status(200).json({ msg: "No friend requests" });
    }
    const friendRequests = await User.find({
      _id: { $in: user.recievedrequests },
    });
    res.json(friendRequests);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// Accept friend request
const acceptFriendRequest = async (req, res) => {
  try {
    const { id, friendId } = req.body;
    const user = await User.findByIdAndUpdate(id, {
      $push: { friends: friendId },
      $pull: { recievedrequests: friendId },
    });
    const friend = await User.findByIdAndUpdate(friendId, {
      $push: { friends: id },
      $pull: { sentrequests: id },
    });
    res.json({ msg: "Successfull", user, friend });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
// Reject friend request
const rejectFriendRequest = async (req, res) => {
  try {
    const { id, friendId } = req.body;
    const user = await User.findByIdAndUpdate(id, {
      $pull: { recievedrequests: friendId },
    });
    const friend = await User.findByIdAndUpdate(friendId, {
      $pull: { sentrequests: id },
    });
    res.json({ msg: "Successfull", user, friend });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

//  Get all friends
const getFriends = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("friends");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Remove Friend
const removeFriend = async (req, res) => {
  try {
    const { id, friendId } = req.body;
    const user = await User.findByIdAndUpdate(id, {
      $pull: { friends: friendId },
    });
    const friend = await User.findByIdAndUpdate(friendId, {
      $pull: { friends: id },
    });
    res.json({ msg: "Successfull", user, friend });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update status

const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const user = await User.findByIdAndUpdate(id, { status });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
module.exports = {
  register,
  login,
  getUsers,
  getUserDetails,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriends,
  removeFriend,
  updateStatus,
};
