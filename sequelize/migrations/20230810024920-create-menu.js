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

      headerImg: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },

      profileImg: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },

      name: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },

      primaryColor: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },

      url: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },

      phoneNumber: {
        type: Sequelize.STRING(60),
        allowNull: true,
        defaultValue: '00000000000',
      },

      instagram: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },

      openDays: {
        type: Sequelize.STRING(60),
        allowNull: true,
      },

      address: {
        type: Sequelize.STRING(60),
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

    await queryInterface.addConstraint('menus', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_user_Id',
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
