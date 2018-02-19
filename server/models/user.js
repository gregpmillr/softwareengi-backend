'use strict';

const Plan = require('./plan');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coach: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  User.associate = function(models) {
    User.belongsToMany(models.plan, { through: 'user_plans', as: 'plan' });
    User.belongsToMany(models.team, { through: 'user_teams', as: 'team' })
  }

  return User;

};
