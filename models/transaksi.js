"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.barang, { foreignKey: "id_barang" });
      this.belongsTo(models.pelanggan, { foreignKey: "id_pelanggan" });
    }
  }
  Transaksi.init(
    {
      id_barang: DataTypes.INTEGER,
      id_pelanggan: DataTypes.INTEGER,
      jumlah: DataTypes.INTEGER,
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      freezeTableName: true,
      modelName: "transaksi",
    }
  );
  return Transaksi;
};
