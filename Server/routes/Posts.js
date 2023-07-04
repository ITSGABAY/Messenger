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
    const imageBuffer = req.file.buffer;
    const imageBlob = new Blob([imageBuffer], { type: "image/jpeg" });
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
      postImage: imageBlob,
    });

    res.send("success");
  }
);

router.get("/getbypostid", validateToken, async (req, res) => {
  const formData = new FormData();
  const postId = req.headers.postid;
  console.log(postId);
  Posts.findByPk(postId).then((post) => {
    res.setHeader("Content-Type", "multipart/form-data");
    formData.append("image", post.postImage);
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("username", post.username);
    formData.append("logoImage", post.logoImage);
    console.log(formData);
    res.send(formData);
  });
});

module.exports = router;
