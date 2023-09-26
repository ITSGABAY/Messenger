const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  createTokens,
  validateToken,
  getIdFromCookie,
} = require("../middleware/JWT");
const jwtkey = process.env.jwtkey;
const {
  getCommentsByPostId,
  mapPostData,
  getUserDataById,
} = require("../middleware/Helpers");
const { Users, Profiles, Comments, Posts, Messages } = require("../models");
const { Op } = require("sequelize");
const { Sequelize, SequelizeUniqueConstraintError } = require("sequelize");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("🚀 ~ file: Users.js:18 ~ router.get ~ req.body:", req);

  console.log("🚀 ~ file: Users.js:18 ~ router.get ~ { username, password }:", {
    username,
    password,
  });

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    return res.status(400).json({ error: "User Doesn't Exist" });
  }

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) {
      return res
        .status(400)
        .json({ error: "Wrong Username And Password Combination" });
    }

    const id = user.id;
    const token = createTokens({ username: username, id: id });
    const email = user.email;
    res.cookie("access-token", token, { maxAge: 1800000, httpOnly: true });

    res.status(200).send(await getUserDataById(user.id));
  });
});

router.get("/validate", validateToken, async (req, res) => {
  const userId = getIdFromCookie(req);
  res.status(200).send(await getUserDataById(userId));
});

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  console.log("req.body::: ", req.body);
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    bcrypt.hash(password, 10).then(async (hash) => {
      await Users.create({
        username: username,
        password: hash,
        email: email,
      });
    });
    await Profiles.create({
      userName: username,
    });
    res.json({ Success: "True" });
  } else {
    res.json({ error: "User Already Exists!" });
  }
});

module.exports = router;
