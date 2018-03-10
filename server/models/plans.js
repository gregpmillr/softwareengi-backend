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
  }, {underscored: true});

  Plan.associate = function(models) {
    Plan.belongsToMany(models.users, {
      through: {
        model : models.user_plans,
        unique: false
      },
      foreignKey: 'plan_id'
    })
    Plan.hasMany(models.steps)
  }
  return Plan;

};
