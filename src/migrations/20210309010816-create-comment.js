'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'RESTRICT',
        references: {
          model: 'users',
          key: 'id',
          as: 'userId',
        }
      },
      imageId: {
        type: Sequelize.INTEGER,
        onDelete: 'RESTRICT',
        references: {
          model: 'images',
          key: 'id',
          as: 'imageId',
        }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};