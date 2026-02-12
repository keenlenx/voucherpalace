const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Voucher = sequelize.define('Voucher', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  voucher_value: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  value_type: { type: DataTypes.ENUM('fixed','percent'), defaultValue: 'fixed' },
  min_spend: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
  max_redemptions: { type: DataTypes.INTEGER, defaultValue: 1 },
  expiry_date: { type: DataTypes.DATE },
  voucher_status: { type: DataTypes.ENUM('active','redeemed','suspended','cancelled','expired'), defaultValue: 'active' }
}, {
  tableName: 'vouchers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// // Associations
// Voucher.belongsTo(Company, { foreignKey: 'company_id' });
// Voucher.belongsTo(Merchant, { foreignKey: 'merchant_id' });
// Voucher.belongsTo(User, { foreignKey: 'assigned_user_id', as: 'assigned_user' });

module.exports = Voucher;
