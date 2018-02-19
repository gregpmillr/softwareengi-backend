'use strict';
module.exports = (sequelize, DataTypes) => {

  const UserPlan = sequelize.define('user_plans', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    plan_id: {
      type: DataTypes.INTEGER,
    },
    coach_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  });

  return UserPlan;

};
