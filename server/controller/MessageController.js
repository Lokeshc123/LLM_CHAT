const Message = require("../model/Message");
const User = require("../model/User");
const Conversation = require("../model/Conversation");
const { getrecid, io } = require("../app");
const { json } = require("body-parser");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDThfRE2TdnYLG4VfDkpy6Rf7SX3w-UMjo");
const aimessage = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt =
      "Write a professional sentence that the user u are trying to send message is unavaliable";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.status(200).json({ message: text });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // Log debug information
    console.log("Received message send request.");
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    // Find conversation or create a new one
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }, // Use $all operator
    });

    if (!conversation) {
      conversation = new Conversation({
        members: [senderId, receiverId],
        messages: [], // Initialize messages array
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Push the message ID (not the entire message object)
    conversation.messages.push(newMessage._id);

    // Save conversation and message
    await Promise.all([conversation.save(), newMessage.save()]);

    // Log debug information
    console.log("Message saved successfully.");

    // Attempt to retrieve receiverSocketId
    const receiverSocketId = getrecid(receiverId);
    console.log("Receiver Socket ID:", receiverSocketId);

    // Emit new message if receiverSocketId exists
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("New message emitted to receiver.");
    }

    // Update sender and receiver with message IDs
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);
    sender.sentmessages.push(newMessage._id);
    receiver.receivedmessages.push(newMessage._id);
    await sender.save();
    await receiver.save();

    res
      .status(200)
      .json({ message: "Message sent successfully", json: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: error.message });
  }
};

const getConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    // Find conversation
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { sendMessage, getConversation, aimessage };
