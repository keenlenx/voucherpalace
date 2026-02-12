const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Merchant = require('./Merchant');

const MerchantSettlement = sequelize.define('MerchantSettlement', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  merchant_id: { type: DataTypes.BIGINT, allowNull: false },
  settlement_period_start: DataTypes.DATEONLY,
  settlement_period_end: DataTypes.DATEONLY,
  total_amount: DataTypes.DECIMAL(12,2),
  status: { type: DataTypes.ENUM('pending','paid'), defaultValue: 'pending' }
}, {
  tableName: 'merchant_settlements',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

MerchantSettlement.belongsTo(Merchant, { foreignKey: 'merchant_id' });

module.exports = MerchantSettlement;
