const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { error } = require("console");

const jwtkey = process.env.jwtkey;

const createTokens = (user) => {
  const accessToken = sign({ username: user.username, id: user.id }, jwtkey);

  return accessToken;
};

const validateToken = (req, res, next) => {
  console.log("---------------------------------");
  console.log("Validate process started");
  try {
    const accessToken = req.headers.cookie.split("=")[1];
    console.log(req.Cookie);
    console.log("access token:" + accessToken);
    if (!accessToken) {
      console.log("Access token not found");
      throw new Error("first step error : Access token not found");
    }
    try {
      console.log("access token exist");
      const validToken = verify(accessToken, jwtkey);
      console.log("access token validate");
      if (validToken) {
        req.authenticated = true;
        console.log("success");
        return next();
      }
    } catch (err) {
      throw new Error("access token not validated , " + err);
    }
  } catch (error) {
    console.log("final error: " + error);
    return res.send({ err2: error });
  }
};
const getDetails = (req) => {
  const accessToken = req.headers.cookie.split("=")[1];
  const decoded = verify(accessToken, jwtkey);
  return { username: decoded.username, id: decoded.id };
};
module.exports = { createTokens, validateToken, getDetails };
