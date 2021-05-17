"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("items", [
      {
        name: "Pepsodent",
        price: 14500,
        amount: 3,
        suplier_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lifeboy",
        price: 24600,
        amount: 3,
        suplier_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Clear",
        price: 44500,
        amount: 3,
        suplier_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("items", null, {});
  },
};
