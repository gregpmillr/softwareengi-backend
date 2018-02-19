'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('teams', {
    name: {
      DataTypes.STRING,
      allowNull: false,
    },
  });

  Team.associate = function(models) {
    Team.belongsToMany(models.user, { through: 'user_teams', as: 'user' })
  };

  return Team;
};
