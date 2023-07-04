module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logoImage: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  });
  return Comments;
};
