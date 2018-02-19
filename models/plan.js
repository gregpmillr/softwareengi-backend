'use strict';
module.exports = (sequelize, DataTypes) => {
  var Plan = sequelize.define('Plan', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

  Plan.associate = function(models) {
    // associations can be defined here
  };

  return Plan;
  
};
