module.exports = (sequelize, DataTypes) => {

  const UserPlan = sequelize.define('user_plans', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    coach_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {underscored: true});

  return UserPlan;

};
