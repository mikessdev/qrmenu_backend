'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          id: '0c8822f5-add0-4a68-abed-afa880df5096',
          title: 'Entradas e Porções',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: '06adf84e-e80c-41c1-8cbe-5899496aa61f',
          title: 'Prato Principal',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: '401053f2-83ef-4dcf-bdc0-579cb57d8b33',
          title: 'Lanches',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: '21df6b7e-bb34-4bc9-8384-5d069d343c88',
          title: 'Bebidas',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: '6f494095-00b2-427e-99b0-a50bee75e0ae',
          title: 'Pasteis',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: '39b9f328-04db-4046-b8f3-745884ed0e14',
          title: 'Coxinhas',
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
