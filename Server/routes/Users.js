const express = require("express");
const router = express.Router();
const { Users, Profiles } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  createTokens,
  validateToken,
  getDetails,
} = require("../middleware/JWT");
const jwtkey = process.env.jwtkey;
const {
  getProfileDataByName,
  getCommentsByPostId,
  getPostByPostId,
  getPostsByUserId,
  mapPostData,
  getUserDataById,
} = require("../middleware/Helpers");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) {
        res.json({ error: "Wrong Username And Password Combination" });
      } else {
        const id = user.id;
        const token = createTokens({ username: username, id: id });
        const email = user.email;
        res.cookie("access-token", token, { maxAge: 600000, httpOnly: true });
        const data = {
          username: username,
          userId: user.id,
          logoImage: await getUserDataById(user.id).logoImage,
        };
        res.send(data);
      }
    });
  }
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        password: hash,
        email: email,
      });
    });
    Profiles.create({
      userName: username,
    });
    res.json({ Success: "True" });
  } else {
    res.json({ error: "User Already Exists!" });
  }
});

module.exports = router;
