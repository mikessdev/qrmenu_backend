'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          id: '1',
          title: 'Porções',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: '2',
          title: 'Pasteis',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  },
};
