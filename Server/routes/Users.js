const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { Profiles } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createTokens, validateToken } = require("../middleware/JWT");
const jwtkey = process.env.jwtkey;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) res.json({ error: "User Doesn't Exist" });
  else {
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match)
        res.json({ error: "Wrong Username And Password Combination" });
      else {
        const id = user.id;
        const token = createTokens({ username: username, password: password });
        const email = user.email;
        res.cookie("access-token", token, { maxAge: 600000, httpOnly: true });
        res.json({
          username: username,
          email: email,
        });
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
      username: username,
      email: email,
    });
    res.json({ Success: "True" });
  } else {
    res.json({ error: "User Already Exists!" });
  }
});

module.exports = router;
router.post("/profile", validateToken, (req, res) => {
  res.json("profile");
});
