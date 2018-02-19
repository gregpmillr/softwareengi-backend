'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    steps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completed_by_date: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  });

  Exercise.associate = function(models) {
    // associations can be defined here
  };

  return Exercise;

};
