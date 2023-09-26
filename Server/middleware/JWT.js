const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { error } = require("console");

const jwtkey = process.env.jwtkey;

const createTokens = (user) => {
  const accessToken = sign({ username: user.username, id: user.id }, jwtkey);
  console.log("Token created for user:", user.username);

  return accessToken;
};

const validateToken = (req, res, next) => {
  const cookie = req.headers.cookie;

  console.log("🚀 ~ file: JWT.js:18 ~ validateToken ~ cookie:", cookie);

  if (!cookie) {
    return res.status(401).json({ error: "Cookie not found" });
  }

  const accessToken = cookie.split("=")[1];
  if (!accessToken) {
    return res.status(401).json({ error: "Access token not found" });
  }

  try {
    verify(accessToken, jwtkey);
    req.authenticated = true;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Invalid access token", details: err.message });
  }
};

const getIdFromCookie = (req) => {
  const accessToken = req.headers.cookie.split("=")[1];
  const decoded = verify(accessToken, jwtkey);

  return decoded.id;
};

module.exports = { createTokens, validateToken, getIdFromCookie };
