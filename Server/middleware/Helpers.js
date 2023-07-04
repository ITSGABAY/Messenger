const { Users } = require("../models");

const getLogoById = (id) => {
  Users.findByPk(parseInt(1)).then((profile) => {
    return profile.logoImage;
  });
};

module.exports = { getLogoById };
