'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
      },

      categoryId: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      price: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('products', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'fk_category_id',
      references: {
        table: 'categories',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'fk_category_id');
    await queryInterface.dropTable('products');
  },
};