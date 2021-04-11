"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("pelanggan", [
      {
        nama: "Firman",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Wawan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Ilham",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("pelanggan", null, {});
  },
};
