const { Users, Profiles, Comments } = require("../models");

const getProfileDataById = async (id) => {
  console.log("id: " + id);
  return Profiles.findByPk(parseInt(id)).then((profile) => {
    return { userName: profile.userName, LogoImage: profile.logoImage };
  });
};

const getCommentsByPostId = async (postId) => {
  const comments = await Comments.findAll({
    where: {
      PostId: postId,
    },
  });

  const commentList = await Promise.all(comments.map(mapCommentData));
  return commentList;
};

const mapCommentData = async (comment) => {
  const userDetails = await getProfileDataById(comment.UserId);
  const data = {
    text: comment.text,
    username: userDetails.userName,
    logoImage: userDetails.logoImage,
  };
  return data;
};

module.exports = { getProfileDataById, getCommentsByPostId };
