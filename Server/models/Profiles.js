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
  });
  return Profiles;
};
