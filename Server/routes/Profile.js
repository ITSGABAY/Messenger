const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const jwt = require("jsonwebtoken");
const { validateToken, getIdFromCookie } = require("../middleware/JWT");
const {
  getProfileDataByName,
  getCommentsByPostId,
  getPostByPostId,
  getPostsByUserId,
  mapPostData,
} = require("../middleware/Helpers");
const multer = require("multer");

router.get("/getprofiledata", validateToken, async (req, res) => {
  console.log("getprofiledata");
  const profileName = req.headers.profilename;
  const profileData = await getProfileDataByName(profileName);
  res.send(profileData);
});

module.exports = router;
