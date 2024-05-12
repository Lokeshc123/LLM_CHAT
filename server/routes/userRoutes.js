const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
  getUserDetails,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  getFriends,
  updateStatus,
} = require("../controller/UserController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getUsers").get(getUsers);
router.route("/userDetails/:id").get(getUserDetails);
router.route("/sendFriendRequest").post(sendFriendRequest);
router.route("/getFriendRequests/:id").get(getFriendRequests);
router.route("/acceptFriendRequest").post(acceptFriendRequest);
router.route("/rejectFriendRequest").post(rejectFriendRequest);
router.route("/getFriends/:id").get(getFriends);
router.route("/removeFriend").post(removeFriend);
router.route("/updateStatus").post(updateStatus);

module.exports = router;
