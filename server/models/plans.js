module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('plans', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

  Plan.associate = function(models) {
    Plan.belongsToMany(models.users, { through: 'user_plans', as: 'user' })
    Plan.hasMany(models.exercises)
  }
  return Plan;

};
