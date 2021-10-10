'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Characters_Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      actorId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'chacacters',
          },
          key: 'id'
        },
        allowNull: false
      },
      movieId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'movies',
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Characters_Movies');
  }
};
