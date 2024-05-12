const express = require("express");
const router = express.Router();

const {
  sendMessage,

  getConversation,
  aimessage,
} = require("../controller/MessageController");

router.post("/sendmessage", sendMessage);
router.get("/getmessages/:senderId/:receiverId", getConversation);
router.get("/ai-msg", aimessage);

module.exports = router;
