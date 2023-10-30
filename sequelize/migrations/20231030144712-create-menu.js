'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menus', {
      id: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
      },

      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      profileImg: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      instagram: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },

      openDays: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },

      address: {
        type: Sequelize.STRING(60),
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

    await queryInterface.addConstraint('menus', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_user_id',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('users', 'fk_user_id');
    await queryInterface.dropTable('menus');
  },
};
