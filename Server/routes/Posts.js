const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const {
  createTokens,
  validateToken,
  getDetails,
} = require("../middleware/JWT");
const { getLogoById } = require("../middleware/Helpers");
const jwtkey = process.env.jwtkey;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
router.use(cookieParser());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create",
  validateToken,
  upload.single("image"),
  async (req, res) => {
    console.log(req.body.imageFile);
    const title = req.body.title;
    const description = req.body.description;
    const details = getDetails(req);
    const username = details.username;
    const userId = details.id;
    console.log(title, description, username, userId);
    Posts.create({
      username: username,
      UserId: userId,
      description: description,
      logoImage: getLogoById(userId),
    });
    res.send("success");
  }
);

module.exports = router;
