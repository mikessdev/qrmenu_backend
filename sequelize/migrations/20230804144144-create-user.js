'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      lastName: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      emailVerified: {
        type: Sequelize.BOOLEAN,
      },

      phoneNumber: {
        type: Sequelize.STRING(11),
        allowNull: true,
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
  },
  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
