module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
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
