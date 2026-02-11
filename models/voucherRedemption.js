const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');


const VoucherRedemption = sequelize.define('VoucherRedemption', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  redeemed_value: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  redeemed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  notes: { type: DataTypes.TEXT }
}, {
  tableName: 'voucher_redemptions',
  timestamps: false
});

// Associations
// VoucherRedemption.belongsTo(Voucher, { foreignKey: 'voucher_id' });
// VoucherRedemption.belongsTo(User, { foreignKey: 'user_id' });
// VoucherRedemption.belongsTo(Merchant, { foreignKey: 'merchant_id' });

// Voucher.hasMany(VoucherRedemption, { foreignKey: 'voucher_id', as: 'redemptions' });
// User.hasMany(VoucherRedemption, { foreignKey: 'user_id' });

module.exports = VoucherRedemption;
