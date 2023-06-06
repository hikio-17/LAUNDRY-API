const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      //
    }
  }
  Product.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};