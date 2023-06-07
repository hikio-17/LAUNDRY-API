const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });

      Order.belongsTo(models.Product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      });
    }
  }
  Order.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
  }, {
    hooks: {
      afterCreate: async (order) => {
        await sequelize.models.AuditLog.create({
          tableName: 'Orders',
          task: 'Insert',
          description: `Insert Order with data ${JSON.stringify(order.toJSON())}`,
        });
      },
      afterUpdate: async (order) => {
        await sequelize.models.AuditLog.create({
          tableName: 'Orders',
          task: 'Update',
          description: `Update Order with data ${JSON.stringify(order.toJSON())}`,
        });
      },
      afterDestroy: async (order) => {
        await sequelize.models.AuditLog.create({
          tableName: 'Orders',
          task: 'Delete',
          description: `Delete Order with data ${JSON.stringify(order.toJSON())}`,
        });
      },
    },
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
