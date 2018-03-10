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
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {underscored: true});

  Step.associate = function(models) {
    Step.belongsTo(models.plans, {
      foreignKey: 'plan_id',
      as: 'plan'
    })
  };

  return Step;

};
