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

const editProfile = async (data) => {
  console.log("🚀 ~ file: Helpers.js:18 ~ editProfile ~ data:", data);

  Profiles.findByPk(parseInt(data.id)).then((profile) => {
    if (data.description != profile.description) {
      profile.description = data.description;
    }

    profile.logoImage = data.image;

    if (profile.userName != data.username) {
      try {
        profile.userName = data.username;
        Users.findByPk(parseInt(data.id)).then((user) => {
          user.username = data.username;
          console.log(
            "🚀 ~ file: Helpers.js:31 ~ Users.findByPk ~ user:",
            user
          );
          user.save();
        });
      } catch (err) {
        if (error instanceof SequelizeUniqueConstraintError) {
          res.status(400).json({ error: "The username already exists." });
        } else {
          res.status(500).json({ error: "An unexpected error occurred." });
        }
      }
    }
    profile.save();
  });
  return;
};

const getRandomProfiles = async (userId) => {
  const randomProfiles = await Profiles.findAll({
    where: {
      id: {
        [Sequelize.Op.ne]: userId,
      },
    },
    order: Sequelize.literal("RAND()"),
    limit: 5,
  });

  const profilesList = randomProfiles.map((profile) => ({
    username: profile.userName,
    logoImage: profile.logoImage,
  }));

  return profilesList;
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
      username: userDetails.userName,
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
      username: CurrentUserDetails.userName,
      logoImage: CurrentUserDetails.logoImage,
      comments: await getCommentsByPostId(post.id),
    };
  }
  return data;
};

const getPostsByUserId = async (userId) => {
  const userDetails = await getUserDataById(userId);
  const posts = await Posts.findAll({
    where: {
      UserId: userId,
    },
  });
  const postList = await Promise.all(
    posts.map((post) => mapPostData(post, userDetails))
  );
  return postList;
};

const getRandomPosts = async (userId) => {
  const posts = await Posts.findAll({
    where: {
      UserId: {
        [Sequelize.Op.ne]: userId,
      },
    },
    order: Sequelize.literal("RAND()"),
    limit: 5,
  });
  const postList = await Promise.all(posts.map((post) => mapPostData(post)));
  return postList;
};

const getPostByPostId = async (postId) => {
  const post = await Posts.findByPk(postId);
  const userDetails = await getUserDataById(post.UserId);
  const data = await mapPostData(post, userDetails);
  return data;
};

const getProfileDataByName = async (profileName) => {
  const profile = await Profiles.findOne({ where: { userName: profileName } });
  const profileId = profile.id;
  const data = {
    username: profile.userName,
    id: profileId,
    description: profile.description,
    logoImage: profile.logoImage,
    posts: await getPostsByUserId(profileId),
  };
  return data;
};

const findPostByTitle = async (title) => {
  const posts = await Posts.findAll({
    where: {
      title: {
        [Op.like]: title,
      },
    },
  });
  const postList = await Promise.all(posts.map((post) => mapPostData(post)));
  return postList;
};

const findProfileByName = async (profileName) => {
  const profiles = await Profiles.findAll({
    where: {
      userName: {
        [Op.like]: profileName,
      },
    },
  });
  const profilesList = await Promise.all(
    profiles.map((profile) => {
      return { username: profile.userName, logoImage: profile.logoImage };
    })
  );
  return profilesList;
};

const addMessage = async (text, image, SenderId, ReceiverName) => {
  const ReceiverUser = await Users.findOne({
    where: { username: ReceiverName },
  });
  const ReceiverId = ReceiverUser.id;

  Messages.create({
    ChatCode:
      SenderId > ReceiverId
        ? `${SenderId}&${ReceiverId}`
        : `${ReceiverId}&${SenderId}`,
    Text: text,
    Image: image,
    SenderId: SenderId,
    ReceiverId: ReceiverId,
  });
};

const getMessages = async (SenderId, friendName) => {
  const friendUser = await Users.findOne({
    where: { username: friendName },
  });
  const friendId = friendUser.id;
  const ChatCode =
    SenderId > friendId ? `${SenderId}&${friendId}` : `${friendId}&${SenderId}`;

  const messagesObj = await Messages.findAll({
    where: {
      ChatCode: ChatCode,
    },
  });
  const messageList = messagesObj.map((message) => {
    return {
      SenderId: message.SenderId,
      ReceiverId: message.ReceiverId,
      Text: message.Text,
      Image: message.Image,
    };
  });
  return messageList;
};

module.exports = {
  getMessages,
  addMessage,
  findProfileByName,
  findPostByTitle,
  getProfileDataByName,
  getCommentsByPostId,
  getPostByPostId,
  getPostsByUserId,
  mapPostData,
  getUserDataById,
  getRandomPosts,
  getRandomProfiles,
  editProfile,
};
