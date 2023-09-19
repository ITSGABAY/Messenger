const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const jwt = require("jsonwebtoken");
const { validateToken, getIdFromCookie } = require("../middleware/JWT");
const { getProfileDataByName, editProfile } = require("../middleware/Helpers");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/getprofiledata/:profilename", validateToken, async (req, res) => {
  const profileName = req.params.profilename;
  const profileData = await getProfileDataByName(profileName);
  res.send(profileData);
});

router.post(
  "/edit/:id",
  validateToken,
  upload.single("image"),
  async (req, res) => {
    const id = req.params.id;
    const data = {
      id: id,
      username: req.body.username,
      description: req.body.description,
      image: req.file.buffer,
    };
    await editProfile(data);
    res.status(200);
  }
);

module.exports = router;
