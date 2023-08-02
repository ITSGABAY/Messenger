const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const jwt = require("jsonwebtoken");
const { validateToken, getIdFromCookie } = require("../middleware/JWT");
const {
  getProfileDataById,
  getCommentsByPostId,
  getPostByPostId,
  getPostsByUserId,
  mapPostData,
} = require("../middleware/Helpers");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/create",
  validateToken,
  upload.single("image"),
  async (req, res) => {
    console.log("-------------- POST /create Request Start --------------");
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
    console.log("POST /create request completed. Created post: ", post);
    console.log("-------------- POST /create Request End --------------");
    res.send("success");
  }
);

router.get("/getpostbypostid", validateToken, async (req, res) => {
  console.log(
    "-------------- GET /getpostbypostid Request Start --------------"
  );
  const postId = req.headers.postid;
  const data = await getPostByPostId(postId);
  console.log("GET /getpostbypostid request completed. Retrieved post: ", data);
  console.log("-------------- GET /getpostbypostid Request End --------------");
  res.send(data);
});

module.exports = router;
