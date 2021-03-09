'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comments', [{
        text: 'I love this!!',
        userId: 1,
        imageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', null, {});
  }
};
