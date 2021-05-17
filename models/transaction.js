'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  transaction.init({
    item_id: DataTypes.INTEGER,
    item_amount: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    ordered_id: DataTypes.INTEGER,
    order_type: DataTypes.ENUM(['buy', 'add'])
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};