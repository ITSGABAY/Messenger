const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getIdFromCookie, validateToken } = require("../middleware/JWT");
const { Users, Profiles, Comments, Posts, Messages } = require("../models");
const { Op } = require("sequelize");
const { Sequelize, SequelizeUniqueConstraintError } = require("sequelize");

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

/////////////////////////////////

const addMessage = async (text, image, SenderId, ReceiverName) => {
  const ReceiverUser = await Users.findOne({
    where: { username: ReceiverName },
  });
  const ReceiverId = ReceiverUser.id;

  Messages.create({
    ChatCode:
      SenderId > ReceiverId
        ? `${SenderId}&${ReceiverId}`
        : `${ReceiverId}&${SenderId}`,
    Text: text,
    Image: image,
    SenderId: SenderId,
    ReceiverId: ReceiverId,
  });
};

const getMessages = async (SenderId, friendName) => {
  const friendUser = await Profiles.findOne({
    where: { userName: friendName },
  });
  const friendId = friendUser.id;
  const ChatCode =
    SenderId > friendId ? `${SenderId}&${friendId}` : `${friendId}&${SenderId}`;

  const messagesObj = await Messages.findAll({
    where: {
      ChatCode: ChatCode,
    },
  });
  const messageList = messagesObj.map((message) => {
    return {
      SenderId: message.SenderId,
      ReceiverId: message.ReceiverId,
      Text: message.Text,
      Image: message.Image,
    };
  });
  return { messagesList: messageList, friendLogo: friendUser.logoImage };
};
module.exports = router;
