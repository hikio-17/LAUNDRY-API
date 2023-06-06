const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AuditLog extends Model {
    static associate(models) {
      // define association here
    }
  }
  AuditLog.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    tableName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'AuditLog',
  });
  return AuditLog;
};