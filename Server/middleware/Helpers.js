const { Users, Profiles, Comments, Posts, Messages } = require("../models");
const { Op } = require("sequelize");

const getUserDataById = async (id) => {
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
  const userDetails = await getUserDataById(comment.UserId);
  const data = {
    text: comment.text,
    username: userDetails.userName,
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
  console.log("ReceiverUser::: ", ReceiverUser);
  const ReceiverId = ReceiverUser.id;

  console.log(
    "text, image, SenderId, ReceiverId::: ",
    text,
    image,
    SenderId,
    ReceiverId
  );

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
  console.log("ChatCode::: ", ChatCode);

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
};
