"use strict";
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const encryptPassword = bcrypt.hashSync('Default1!', 10)
    return queryInterface.bulkInsert("users", [
      {
        name: "Khay",
        email: 'zeroone@gmail.com',
        password: encryptPassword,
        type: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Heru",
        email: 'zerotwo@gmail.com',
        password: encryptPassword,
        type: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Siti",
        email: 'zerothree@gmail.com',
        password: encryptPassword,
        type: 'suplier',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
