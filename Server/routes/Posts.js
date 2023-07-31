const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const jwt = require("jsonwebtoken");
const { validateToken, getIdFromCookie } = require("../middleware/JWT");
const {
  getProfileDataById,
  getCommentsByPostId,
} = require("../middleware/Helpers");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const mapPostData = async (post, userDetails) => {
  console.log("-------------- mapPostData Function Start --------------");
  console.log("userDetails::: ", userDetails);
  const data = {
    id: post.id,
    image: post.postImage,
    title: post.title,
    description: post.description,
    username: userDetails.userName,
    logoImage: userDetails.logoImage,
    comments: await getCommentsByPostId(post.id),
  };
  console.log("mapPostData result: ", data);
  console.log("-------------- mapPostData Function End --------------");
  return data;
};

const getPostsByUserId = async (userId) => {
  console.log("-------------- getPostsByUserId Function Start --------------");
  const userDetails = await getProfileDataById(userId);
  const posts = await Posts.findAll({
    where: {
      UserId: userId,
    },
  });
  const postList = await Promise.all(
    posts.map((post) => mapPostData(post, userDetails))
  );
  console.log("getPostsByUserId result: ", postList);
  console.log("-------------- getPostsByUserId Function End --------------");
  return postList;
};

const getPostByPostId = async (postId) => {
  console.log("-------------- getPostByPostId Function Start --------------");
  const post = await Posts.findByPk(postId);
  const userDetails = await getProfileDataById(post.UserId);
  const data = await mapPostData(post, userDetails);
  console.log("getPostByPostId result: ", data);
  console.log("-------------- getPostByPostId Function End --------------");
  return data;
};

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

router.get("/getpostsbyuserid", validateToken, async (req, res) => {
  console.log(
    "-------------- GET /getpostsbyuserid Request Start --------------"
  );
  const userId = req.headers.userid;
  const posts = await getPostsByUserId(userId);
  console.log(
    "GET /getpostsbyuserid request completed. Retrieved posts: ",
    posts
  );
  console.log(
    "-------------- GET /getpostsbyuserid Request End --------------"
  );
  res.send(posts);
});

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
