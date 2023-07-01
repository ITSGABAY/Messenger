const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const jwtkey = process.env.jwtkey;

const createTokens = (user) => {
  const accessToken = sign({ username: user.username, id: user.id }, jwtkey);

  return accessToken;
};

const validateToken = (req, res, next) => {
  try {
    const accessToken = req.headers.cookie.split("=")[1];

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    // Rest of your code here...

    try {
      const validToken = verify(accessToken, jwtkey);
      if (validToken) {
        req.authenticated = true;
        return next();
      }
    } catch (err) {
      return res.status(400).json({ error: "User not Authenticated!" });
    }
  } catch (err) {
    return res.status(400).json({ error: "User not Authenticated!" });
  }
};

module.exports = { createTokens, validateToken };
