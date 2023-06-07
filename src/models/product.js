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
    hooks: {
      afterCreate: async (product) => {
        await sequelize.models.AuditLog.create({
          tableName: 'Products',
          task: 'Insert',
          description: `Insert product with data ${JSON.stringify(product.toJSON())}`,
        });
      },
      afterUpdate: async (product) => {
        await sequelize.models.AuditLog.create({
          tableName: 'Products',
          task: 'Update',
          description: `Update product with data ${JSON.stringify(product.toJSON())}`,
        });
      },
      afterDestroy: async (product) => {
        await sequelize.models.AuditLog.create({
          tableName: 'Products',
          task: 'Delete',
          description: `Delete product with data ${JSON.stringify(product.toJSON())}`,
        });
      },
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};