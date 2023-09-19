const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { getIdFromCookie, validateToken } = require("../middleware/JWT");
const {
  getRandomPosts,
  getUserDataById,
  getRandomProfiles,
} = require("../middleware/Helpers");

router.get("/", validateToken, async (req, res) => {
  const userId = getIdFromCookie(req);
  const posts = await getRandomPosts(userId);
  const user = await getUserDataById(userId);
  const profiles = await getRandomProfiles(userId);
  const data = { user: user, posts: posts, profiles: profiles };

  res.send(data);
});

module.exports = router;
