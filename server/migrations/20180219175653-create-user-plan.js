'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_plans', {
      id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model : 'users',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      plan_id: {
        type: Sequelize.INTEGER,
        references: {
          model : 'plans',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      coach_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_plans');
  }
};
