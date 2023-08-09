module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define("Messages", {
    ChatCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SenderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ReceiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    Text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Messages;
};
