'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('images', [{
        title: 'Calico Kitten',
        url: 'https://i.pinimg.com/564x/10/45/a1/1045a17d84c37ced6a84e41c6281106d.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
          title: 'Smoothie', 
          url: 'https://www.usmagazine.com/wp-content/uploads/2018/06/Smoothie-the-Cat-Instagram-zoom.jpg?quality=86&strip=all',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
        title: 'Smoothie Close Up', 
        url: 'https://welovecatsandkittens.com/wp-content/uploads/2017/09/smoothie.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Smoothie and Milkshake', 
        url: 'https://i.pinimg.com/originals/7d/b7/e7/7db7e7414842d89ca7741009b10cc376.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Cat Loaves', 
        url: 'https://i.redd.it/z9hb84g2yxvz.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    }, 
    {
        title: 'Bingus', 
        url: 'https://pbs.twimg.com/media/EoXHx4cUwAAf8Wx.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('images', null, {});
  }
};