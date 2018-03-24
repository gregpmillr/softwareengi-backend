module.exports = (sequelize, DataTypes) => {

  const UserPlan = sequelize.define('user_plans', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {underscored: true});

  UserPlan.associate = function(models) {
    UserPlan.hasMany(models.steps, {
      foreignKey: 'step_id'
    })
  }

  return UserPlan;

};
