const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { validateToken, getIdFromCookie } = require("../middleware/JWT");
const {
  getCommentsByPostId,
  mapPostData,
  getUserDataById,
} = require("../middleware/Helpers");
const multer = require("multer");
const { Users, Profiles, Comments, Posts, Messages } = require("../models");
const { Op } = require("sequelize");
const { Sequelize, SequelizeUniqueConstraintError } = require("sequelize");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/getprofiledata/:profilename", validateToken, async (req, res) => {
  const profileName = req.params.profilename;
  try {
    const profileData = await getProfileDataByName(profileName);

    res.send(profileData);
  } catch (error) {
    if (error.message === "Profile not found") {
      return res.status(404).send({ error: "Profile not found" });
    }
    res.status(500).send({ error: "An unexpected error occurred." });
  }
});

router.post(
  "/edit/:id",
  validateToken,
  upload.single("image"),
  async (req, res) => {
    const id = req.params.id;
    const data = {
      id: id,
      username: req.body.username,
      description: req.body.description,
    };
    data.image = req.file ? req.file.buffer : null;
    await editProfile(data);
    res.status(200);
  }
);

//////////////////////////////////////////

const editProfile = async (data) => {
  Profiles.findByPk(parseInt(data.id)).then((profile) => {
    if (data.description != profile.description) {
      profile.description = data.description;
    }
    if (data.image) {
      profile.logoImage = data.image;
    }
    if (profile.userName != data.username && data.username != null) {
      try {
        profile.userName = data.username;
        Users.findByPk(parseInt(data.id)).then((user) => {
          user.username = data.username;
          user.save();
        });
      } catch (err) {
        if (error instanceof SequelizeUniqueConstraintError) {
          res.status(400).json({ error: "The username already exists." });
        } else {
          res.status(500).json({ error: "An unexpected error occurred." });
        }
      }
    }
    profile.save();
  });
  return;
};

const getProfileDataByName = async (profileName) => {
  const profile = await Profiles.findOne({ where: { userName: profileName } });
  if (!profile) {
    throw new Error("Profile not found");
  }
  const profileId = profile.id;
  const data = {
    username: profile.userName,
    id: profileId,
    description: profile.description,
    logoImage: profile.logoImage,
    posts: await getPostsByUserId(profileId),
  };
  return data;
};

const getPostsByUserId = async (userId) => {
  const userDetails = await getUserDataById(userId);
  const posts = await Posts.findAll({
    where: {
      UserId: userId,
    },
  });

  const postList = await Promise.all(
    posts.map((post) => mapPostData(post, userDetails))
  );
  console.log(
    "🚀 ~ file: Profile.js:108 ~ getPostsByUserId ~ postList:",
    postList
  );

  return postList;
};
module.exports = router;
