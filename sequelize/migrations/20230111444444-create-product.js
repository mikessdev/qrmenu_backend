'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      image: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },

      description: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      price: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },

      unit: {
        type: Sequelize.STRING(18),
        allowNull: false,
      },

      likes: {
        type: Sequelize.INTEGER(),
        allowNull: true,
      },

      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: true,
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

  async down(queryInterface) {
    await queryInterface.removeConstraint('products', 'fk_category_id');
    await queryInterface.dropTable('products');
  },
};
