'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('likes', [{
        userId: 2,
        imageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('likes', null, {});
  }
};
