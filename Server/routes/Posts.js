const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const jwt = require("jsonwebtoken");
const { validateToken, getIdFromCookie } = require("../middleware/JWT");
const {
  getCommentsByPostId,
  mapPostData,
  getUserDataById,
} = require("../middleware/Helpers");
const multer = require("multer");
const { Op } = require("sequelize");
const { Sequelize, SequelizeUniqueConstraintError } = require("sequelize");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create",
  validateToken,
  upload.single("image"),
  async (req, res) => {
    const imageBuffer = req.file.buffer;
    const title = req.body.title;
    const description = req.body.description;
    const userId = getIdFromCookie(req);
    const post = await Posts.create({
      postImage: imageBuffer,
      title: title,
      description: description,
      UserId: userId,
    });
    res.send("success");
  }
);

router.get("/getpostbypostid/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  const data = await getPostByPostId(postId);
  res.send(data);
});

////////////////////////////////

const getPostByPostId = async (postId) => {
  const post = await Posts.findByPk(postId);
  const userDetails = await getUserDataById(post.UserId);
  const data = await mapPostData(post, userDetails);

  console.log("🚀 ~ file: Posts.js:50 ~ getPostByPostId ~ data:", data);

  return data;
};

module.exports = router;
