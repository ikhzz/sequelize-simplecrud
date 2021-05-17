'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      item_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ordered_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order_type: {
        type: Sequelize.ENUM(['buy', 'add']),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
    await queryInterface.addConstraint("transactions", {
      fields: ["ordered_id"],
      type: "foreign key",
      name: "custom_fkey_order_id",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("transactions", {
      fields: ["item_id"],
      type: "foreign key",
      name: "custom_fkey_item_id_transaction",
      references: {
        table: "items",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};