const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const axios = require("axios");
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
const FormData = require("form-data");
router.use(cookieParser());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create",
  validateToken,
  upload.single("image"),
  async (req, res) => {
    const imageBuffer = req.file.buffer;
    console.log("imageBuffer::: ", imageBuffer);
    const title = req.body.title;
    const description = req.body.description;
    const details = getDetails(req);
    const username = details.username;
    const userId = details.id;
    console.log(title, description, username, userId);

    Posts.create({
      username: username,
      postImage: imageBuffer,
      title: title,
      description: description,
      UserId: userId,
      description: description,
      logoImage: getLogoById(userId),
    });

    res.send("success");
  }
);

router.get("/getbypostid", validateToken, async (req, res) => {
  const formData = new FormData();
  const postId = req.headers.postid;
  console.log(postId);
  Posts.findByPk(postId).then((post) => {
    const formData = new FormData();

    formData.append("image", post.postImage);
    console.log("post.postImage::: ", post.postImage);
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("username", post.username);
    res.send(formData);
  });
});

module.exports = router;
