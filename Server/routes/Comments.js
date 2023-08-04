const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { getIdFromCookie, validateToken } = require("../middleware/JWT");
const {
  getProfileDataById,
  getCommentsByPostId,
} = require("../middleware/Helpers");

router.post("/create/:postid", validateToken, async (req, res) => {
  const text = req.body.comment;
  const userId = getIdFromCookie(req);
  const postId = req.params.postid;
  await Comments.create({
    text: text,
    UserId: userId,
    PostId: postId,
  });

  res.send(await getCommentsByPostId(postId));
});

module.exports = router;
