module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define("Profiles", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logoImage: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Profiles;
};
