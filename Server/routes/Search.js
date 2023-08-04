const express = require("express");
const router = express.Router();
const { getIdFromCookie, validateToken } = require("../middleware/JWT");
const { findPostByTitle, findProfileByName } = require("../middleware/Helpers");
router.get("/:id", validateToken, async (req, res) => {
  const searchValue = req.params.id;
  const posts = await findPostByTitle(searchValue);
  const profiles = await findProfileByName(searchValue);
  const results = {
    posts: posts,
    profiles: profiles,
  };
  res.send(results);
});

module.exports = router;
