module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coach: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {underscored: true});

  User.associate = function(models) {
    User.belongsToMany(models.plans, { through: 'user_plans', as: 'plan' });
    User.belongsToMany(models.teams, { through: 'user_teams', as: 'team' })
  }

  return User;

};
