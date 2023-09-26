const express = require("express");
const router = express.Router();
const { Users, Profiles, Comments, Posts, Messages } = require("../models");
const { Op } = require("sequelize");
const { Sequelize, SequelizeUniqueConstraintError } = require("sequelize");
const {
  getCommentsByPostId,
  mapPostData,
  getUserDataById,
} = require("../middleware/Helpers");
const { getIdFromCookie, validateToken } = require("../middleware/JWT");
router.get("/:searchValue", validateToken, async (req, res) => {
  const searchValue = req.params.searchValue;
  const posts = await findPostByTitle(searchValue);
  const profiles = await findProfileByName(searchValue);
  const results = {
    posts: posts,
    profiles: profiles,
  };
  res.send(results);
});

//////////////////////////////////
const findProfileByName = async (profileName) => {
  const profiles = await Profiles.findAll({
    where: {
      userName: {
        [Op.like]: `%${profileName}%`,
      },
    },
  });
  const profilesList = await Promise.all(
    profiles.map((profile) => {
      return { username: profile.userName, logoImage: profile.logoImage };
    })
  );
  return profilesList;
};

const findPostByTitle = async (title) => {
  const posts = await Posts.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`,
      },
    },
  });
  const postList = await Promise.all(posts.map((post) => mapPostData(post)));
  return postList;
};

module.exports = router;
