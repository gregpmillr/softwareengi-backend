'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    // associations can be defined here
  };

  return User;

};
