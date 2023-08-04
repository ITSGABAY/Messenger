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

router.get("/getprofiledata/:profilename", validateToken, async (req, res) => {
  const profileName = req.params.profilename;
  const profileData = await getProfileDataByName(profileName);
  res.send(profileData);
});

module.exports = router;
