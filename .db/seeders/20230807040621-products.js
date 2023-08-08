'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('products', [
        {
          id: "1",
          categoryId:"1",
          title: "test",
          description: "test",
          price: "R$ 15.00",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          id: "2",
          categoryId: "1",
          title: "test",
          description: "test",
          price: "R$ 15.00",
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          id: "3",
          categoryId: "1",
          title: "test",
          description: "test",
          price: "R$ 15.00",
          updatedAt: new Date(),
          createdAt: new Date()
        }
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
