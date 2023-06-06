/* eslint-disable no-param-reassign */
const {
  Model,
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, {
        foreignKey: 'id',
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6],
            msg: 'Password must be more than 6 characters',
          },
        },
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          const hashedPassword = await bcrypt.hashSync(user.password, 10);
          user.password = hashedPassword;
        },
        afterCreate: async (user) => {
          await sequelize?.models.AuditLog.create({
            tableName: 'Users',
            task: 'Insert',
            description: `Insert user with userId '${user.id}'`,
          });
        },
      },
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
