const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { error } = require("console");

const jwtkey = process.env.jwtkey;

const createTokens = (user) => {
  console.log("-------------- Creating Token Start --------------");
  const accessToken = sign({ username: user.username, id: user.id }, jwtkey);
  console.log("Token created for user:", user.username);
  console.log("-------------- Creating Token End --------------");

  return accessToken;
};

const validateToken = (req, res, next) => {
  console.log("-------------- Validating Token Start --------------");

  const cookie = req.headers.cookie;
  if (!cookie) {
    console.log("Cookie not found");
    return res.status(400).json({ error: "Cookie not found" });
  }

  const accessToken = cookie.split("=")[1];
  if (!accessToken) {
    console.log("Access token not found");
    return res.status(401).json({ error: "Access token not found" });
  }

  try {
    verify(accessToken, jwtkey);
    console.log("Access token validated successfully");
    req.authenticated = true;
    console.log("-------------- Validating Token End --------------");
    next();
  } catch (err) {
    console.log("Error in access token validation:", err.message);
    return res
      .status(403)
      .json({ error: "Invalid access token", details: err.message });
  }
};

const getIdFromCookie = (req) => {
  console.log("-------------- Retrieving ID Start --------------");
  const accessToken = req.headers.cookie.split("=")[1];
  const decoded = verify(accessToken, jwtkey);
  console.log("ID retrieved:", decoded.id);
  console.log("-------------- Retrieving ID End --------------");

  return decoded.id;
};

module.exports = { createTokens, validateToken, getIdFromCookie };
