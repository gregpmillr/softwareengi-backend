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
    required_steps: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {underscored: true});

  Plan.associate = function(models) {
    Plan.belongsToMany(models.users, {
      through: 'user_plans',
      foreignKey: 'plan_id'
    })
  };

  return Plan;

};
