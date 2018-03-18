module.exports = (sequelize, DataTypes) => {

  const UserTeam = sequelize.define('user_teams', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  }, {underscored: true});

  return UserTeam;

};
