'use strict';
module.exports = (sequelize, DataTypes) => {
  var user_teams = sequelize.define('user_teams', {
    user_id: DataTypes.INTEGER
  }, {});
  user_teams.associate = function(models) {
    // associations can be defined here
  };
  return user_teams;
};