module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('steps', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    steps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {underscored: true});

  Step.associate = function(models) {
    Step.belongsTo(models.user_plans, {
      foreignKey: 'user_plans_id'
    })
  };

  return Step;

};
