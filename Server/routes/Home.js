const express = require("express");
const router = express.Router();
const { Users, Profiles, Comments, Posts, Messages } = require("../models");
const { Op } = require("sequelize");
const { Sequelize, SequelizeUniqueConstraintError } = require("sequelize");
const { getIdFromCookie, validateToken } = require("../middleware/JWT");
const {
  getCommentsByPostId,
  mapPostData,
  getUserDataById,
} = require("../middleware/Helpers");
router.get("/", validateToken, async (req, res) => {
  const userId = getIdFromCookie(req);
  const posts = await getRandomPosts(userId);
  const user = await getUserDataById(userId);
  const profiles = await getRandomProfiles(userId);
  const data = { user: user, posts: posts, profiles: profiles };

  res.send(data);
});

////////////////////////////////////////////////////////////////////

const getRandomProfiles = async (userId) => {
  const randomProfiles = await Profiles.findAll({
    where: {
      id: {
        [Sequelize.Op.ne]: userId,
      },
    },
    order: Sequelize.literal("RAND()"),
    limit: 5,
  });

  const profilesList = randomProfiles.map((profile) => ({
    username: profile.userName,
    logoImage: profile.logoImage,
  }));

  return profilesList;
};

const getRandomPosts = async (userId) => {
  const posts = await Posts.findAll({
    where: {
      UserId: {
        [Sequelize.Op.ne]: userId,
      },
    },
    order: Sequelize.literal("RAND()"),
    limit: 5,
  });
  const postList = await Promise.all(posts.map((post) => mapPostData(post)));
  return postList;
};

module.exports = router;
