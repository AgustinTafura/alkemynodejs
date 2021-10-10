'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      awards: {
        type: Sequelize.INTEGER
      },
      releaseDate: {
        type: Sequelize.DATE
      },
      length: {
        type: Sequelize.SMALLINT
      },
      genreId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'genres',
            // schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
      },
      revenue: {
        type: Sequelize.INTEGER
      },
      directorId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'directors',
            // schema: 'schema'
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
    await queryInterface.dropTable('Movies');
  }
};