const { Users, Profiles, Comments, Posts } = require("../models");

const getUserDataById = async (id) => {
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
  const userDetails = await getUserDataById(comment.UserId);
  const data = {
    text: comment.text,
    username: userDetails.userName,
    logoImage: userDetails.logoImage,
  };
  return data;
};

const mapPostData = async (post, userDetails) => {
  console.log("-------------- mapPostData Function Start --------------");
  console.log("userDetails::: ", userDetails);
  const data = {
    id: post.id,
    image: post.postImage,
    title: post.title,
    description: post.description,
    username: userDetails.userName,
    logoImage: userDetails.logoImage,
    comments: await getCommentsByPostId(post.id),
  };
  console.log("mapPostData result: ", data);
  console.log("-------------- mapPostData Function End --------------");
  return data;
};

const getPostsByUserId = async (userId) => {
  console.log("-------------- getPostsByUserId Function Start --------------");
  const userDetails = await getUserDataById(userId);
  const posts = await Posts.findAll({
    where: {
      UserId: userId,
    },
  });
  const postList = await Promise.all(
    posts.map((post) => mapPostData(post, userDetails))
  );
  console.log("getPostsByUserId result: ", postList);
  console.log("-------------- getPostsByUserId Function End --------------");
  return postList;
};

const getPostByPostId = async (postId) => {
  console.log("-------------- getPostByPostId Function Start --------------");
  const post = await Posts.findByPk(postId);
  const userDetails = await getUserDataById(post.UserId);
  const data = await mapPostData(post, userDetails);
  console.log("getPostByPostId result: ", data);
  console.log("-------------- getPostByPostId Function End --------------");
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

module.exports = {
  getProfileDataByName,
  getCommentsByPostId,
  getPostByPostId,
  getPostsByUserId,
  mapPostData,
};
