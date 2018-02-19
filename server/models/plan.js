'use strict';
module.exports = (sequelize, DataTypes) => {
  var Plan = sequelize.define('plans', {
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
    Plan.belongsToMany(models.user, { through: 'user_plans', as: 'user' })
    Plan.hasMany(models.exercise)
  }
  return Plan;

};
