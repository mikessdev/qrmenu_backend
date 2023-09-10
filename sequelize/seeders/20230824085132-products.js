'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          id: 'a15ff333-bfac-497c-9362-af1e52736344',
          categoryId: '0c8822f5-add0-4a68-abed-afa880df5096',
          title: 'Iscas de Frango',
          description: '300g de filézinho empanado.',
          price: 'R$ 15.00',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: '1bee824d-61cd-4e5b-9a29-6f91849bdb05',
          categoryId: '0c8822f5-add0-4a68-abed-afa880df5096',
          title: 'Porção de Batatas Fritas',
          description: '300g de batatas fritas.',
          price: 'R$ 15.00',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 'f6584e52-d357-4ea7-9ecc-5c31218fbe68',
          categoryId: '06adf84e-e80c-41c1-8cbe-5899496aa61f',
          title: 'Filé à Parmegiana',
          description:
            'Um suculento filé de frango ou carne, empanado e coberto com molho de tomate e queijo derretido. Acompanha arroz e batatas fritas.',
          price: 'R$ 55.00',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 'f6584e52-d357-4ea7-9ecc-5c31218fbe67',
          categoryId: '06adf84e-e80c-41c1-8cbe-5899496aa61f',
          title: 'Filé à Parmegiana',
          description:
            'Um suculento filé de frango ou carne, empanado e coberto com molho de tomate e queijo derretido. Acompanha arroz e batatas fritas.',
          price: 'R$ 55.00',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 'f6584e52-d357-4ea7-9ecc-5c31218fbe69',
          categoryId: '06adf84e-e80c-41c1-8cbe-5899496aa61f',
          title: 'Filé à Parmegiana',
          description:
            'Um suculento filé de frango ou carne, empanado e coberto com molho de tomate e queijo derretido. Acompanha arroz e batatas fritas.',
          price: 'R$ 55.00',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 'f6584e52-d357-4ea7-9ecc-5c31218fbe79',
          categoryId: '0c8822f5-add0-4a68-abed-afa880df5096',
          title: 'Filé à Parmegiana',
          description:
            'Um suculento filé de frango ou carne, empanado e coberto com molho de tomate e queijo derretido. Acompanha arroz e batatas fritas.',
          price: 'R$ 55.00',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 'f6584e52-d357-4ea7-9ecc-5c31218fbe19',
          categoryId: '0c8822f5-add0-4a68-abed-afa880df5096',
          title: 'Filé à Parmegiana',
          description:
            'Um suculento filé de frango ou carne, empanado e coberto com molho de tomate e queijo derretido. Acompanha arroz e batatas fritas.',
          price: 'R$ 55.00',
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        {
          id: 'f6584e52-d357-4ea7-9ecc-5c31218fbe29',
          categoryId: '0c8822f5-add0-4a68-abed-afa880df5096',
          title: 'Filé à Parmegiana',
          description:
            'Um suculento filé de frango ou carne, empanado e coberto com molho de tomate e queijo derretido. Acompanha arroz e batatas fritas.',
          price: 'R$ 55.00',
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
