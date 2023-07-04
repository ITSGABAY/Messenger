const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  createTokens,
  validateToken,
  getDetails,
} = require("../middleware/JWT");
const jwtkey = process.env.jwtkey;
var cors = require("cors");
router.use(cors());
router.post("/", validateToken, async (req, res) => {
  console.log(req);
});

module.exports = router;
