const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Users } = require("../models");
const { getIdFromCookie, validateToken } = require("../middleware/JWT");
const { addMessage } = require("../middleware/Helpers");
const profile = await Profiles.findOne({ where: { userName: profileName } });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/addmessage/:receiverId",
  validateToken,
  upload.single("image"),
  async (req, res) => {
    const receiverId = profile.id;
    const messageText = req.body.text;
    const messageImage = req.file.buffer;
    const userId = getIdFromCookie(req);
    await addMessage(messageText, messageImage, userId, receiverId);

    res.send("hello");
  }
);

router.post("/getmessages/:receiverId", validateToken, async (req, res) => {});

module.exports = router;
