'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('images', [{
        title: 'Calico Kitten',
        url: 'https://i.pinimg.com/564x/10/45/a1/1045a17d84c37ced6a84e41c6281106d.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('images', null, {});
  }
};
