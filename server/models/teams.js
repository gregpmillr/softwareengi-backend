module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('teams', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Team.associate = function(models) {
    Team.belongsToMany(models.users, { through: 'user_teams', as: 'user' })
  };

  return Team;
};
