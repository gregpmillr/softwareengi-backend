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
  }, {underscored: true});

  Team.associate = function(models) {
    Team.belongsToMany(models.users, {
      through: {
        model: models.user_teams,
        unique: false
      },
      foreignKey: 'team_id'
    })
  };

  return Team;
};
