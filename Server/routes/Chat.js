const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Users } = require("../models");
const { getIdFromCookie, validateToken } = require("../middleware/JWT");
const { addMessage, getMessages } = require("../middleware/Helpers");
const socketIo = require("socket.io");

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/addmessage/:receiverName",
  validateToken,
  upload.single("image"),
  async (req, res) => {
    const receiverName = req.params.receiverName;
    console.log("receiverName::: ", receiverName);
    const messageText = req.body.text;
    const messageImage = req.file ? req.file.buffer : null;
    const userId = getIdFromCookie(req);
    await addMessage(messageText, messageImage, userId, receiverName);
    res.send("hello");
  }
);

router.post("/getmessages/:receiverName", validateToken, async (req, res) => {
  const receiverName = req.params.receiverName;
  const userId = getIdFromCookie(req);
  const messages = await getMessages(userId, receiverName);
  console.log("messages::: ", messages);
  res.send(messages);
});

router.post("/getmessages/:receiverId", validateToken, async (req, res) => {});

module.exports = router;
