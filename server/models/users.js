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
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {underscored: true});

  User.associate = function(models) {
    User.belongsToMany(models.plans, {
      through: {
        model: models.user_plans,
        unique: false
      },
      foreignKey: 'user_id'
    });

    User.belongsToMany(models.teams, {
      through: {
        model: models.user_teams,
        unique: false
      },
      foreignKey: 'user_id'
    })
  }

  return User;

};
