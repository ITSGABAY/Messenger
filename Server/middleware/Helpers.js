const { Users, Profiles, Comments, Posts, Messages } = require("../models");
const { Op } = require("sequelize");
const { Sequelize, SequelizeUniqueConstraintError } = require("sequelize");

const getUserDataById = async (id) => {
  return Profiles.findByPk(parseInt(id)).then((profile) => {
    return {
      userId: id,
      username: profile.userName,
      logoImage: profile.logoImage,
      description: profile.description,
    };
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
  const userDetails = await getUserDataById(comment.UserId);
  const data = {
    text: comment.text,
    username: userDetails.username,
    logoImage: userDetails.logoImage,
  };

  return data;
};

const mapPostData = async (post, userDetails = null) => {
  let data = {};
  if (userDetails) {
    data = {
      id: post.id,
      image: post.postImage,
      title: post.title,
      description: post.description,
      username: userDetails.username,
      logoImage: userDetails.logoImage,
      comments: await getCommentsByPostId(post.id),
    };
  } else {
    const CurrentUserDetails = await getUserDataById(post.UserId);
    data = {
      id: post.id,
      image: post.postImage,
      title: post.title,
      description: post.description,
      username: CurrentUserDetails.username,
      logoImage: CurrentUserDetails.logoImage,
      comments: await getCommentsByPostId(post.id),
    };
  }

  return data;
};

module.exports = {
  getCommentsByPostId,
  mapPostData,
  getUserDataById,
};
