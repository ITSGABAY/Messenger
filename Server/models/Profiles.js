module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define("Profiles", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logoImage: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  });
  return Profiles;
};
