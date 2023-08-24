'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          id: '1',
          categoryId: '1',
          title: 'Batata Frita',
          description: 'Porção de batata frita',
          price: 'R$ 15.00',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: '2',
          categoryId: '1',
          title: 'Calabresa',
          description: 'Porção de calabresa',
          price: 'R$ 15.00',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: '3',
          categoryId: '2',
          title: 'Pastel de frango',
          description: 'Pastel de frango',
          price: 'R$ 15.00',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'fk_category_id');
    await queryInterface.dropTable('products');
  },
};
