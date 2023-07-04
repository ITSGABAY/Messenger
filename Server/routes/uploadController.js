const express = require("express");
const router = express.Router();
const { Profiles } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createTokens, validateToken } = require("../middleware/JWT");
const jwtkey = process.env.jwtkey;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

function insertLogo(id) {
  Profiles.findByPk(parseInt(id)).then((profile) => {
    if (profile) {
      imagePath =
        "D:/YairGabay/8200/Projects/Messenger/Server/Images\\" + id + ".png";
      const imageData = fs.readFileSync(imagePath);
      profile.logoImage = imageData;
      profile.save();
    }
  });
}

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  const imageBuffer = req.file.buffer;
  const userId = req.headers["id"];
  insertLogo(req.headers["id"]);
  Profiles.findByPk(parseInt(1)).then((profile) => {
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Content-Disposition", 'inline; filename="image.jpg"');
    res.send(profile.logoImage);
  });
});

router.post("/create", validateToken, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const { username, userId } = getDetails(req);
  Posts.create({
    username: username,
    UserId: id,
    description: description,
    logoImage: getLogoById(userId),
  });
});
module.exports = router;
