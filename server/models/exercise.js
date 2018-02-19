'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('exercises', {
    steps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completed_by_date: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {underscored: true});

  Exercise.associate = function(models) {
    Exercise.belongsTo(models.plan)
  };

  return Exercise;

};
