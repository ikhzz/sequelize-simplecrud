"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transaksi", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_barang: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      id_pelanggan: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      jumlah: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      total: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("transaksi", {
      fields: ["id_barang"],
      type: "foreign key",
      name: "custom_fkey_id_barang",
      references: {
        table: "barang",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("transaksi", {
      fields: ["id_pelanggan"],
      type: "foreign key",
      name: "custom_fkey_id_pelangan",
      references: {
        table: "pelanggan",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("transaksi");
  },
};
