module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logoImage: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    postImage: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
  });
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, { onDelete: "cascade" });
  };
  return Posts;
};
