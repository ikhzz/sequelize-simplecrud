"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("transaksi", [
      {
        id_barang: 1,
        id_pelanggan: 1,
        jumlah: 1,
        total: 14500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_barang: 2,
        id_pelanggan: 2,
        jumlah: 2,
        total: 49200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_barang: 3,
        id_pelanggan: 3,
        jumlah: 3,
        total: 133500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("transaksi", null, {});
  },
};
