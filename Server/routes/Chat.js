const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Users } = require("../models");
const { getIdFromCookie, validateToken } = require("../middleware/JWT");
const { addMessage, getMessages } = require("../middleware/Helpers");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/addmessage/:receiverName",
  validateToken,
  upload.single("image"),
  async (req, res) => {
    const receiverName = req.params.receiverName;
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
  res.send(messages);
});

router.post("/getmessages/:receiverId", validateToken, async (req, res) => {});

module.exports = router;
