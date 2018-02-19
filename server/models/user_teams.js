module.exports = (sequelize, DataTypes) => {

  const UserTeam = sequelize.define('user_teams', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    coach_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  });

  return UserTeam;

};
