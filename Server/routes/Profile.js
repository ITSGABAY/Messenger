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
  console.log(
    "-------------- GET /getprofiledata Request Start --------------"
  );
  const profileName = req.headers.profilename;
  console.log("profileName::: ", req.headers);
  const profileData = await getProfileDataByName(profileName);
  console.log(
    "GET /getprofiledata request completed. Retrieved Profile Data: ",
    profileData
  );
  console.log("-------------- GET /getprofiledata Request End --------------");
  res.send(profileData);
});

module.exports = router;
