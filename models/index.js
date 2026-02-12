const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

// Import model definitions (NOT destructured)
const CompanyModel = require('./company');
const UserModel = require('./user');
const MerchantModel = require('./merchant');
const VoucherModel = require('./voucher');
const VoucherRedemptionModel = require('./voucherRedemption');

const db = {};

// Initialize models
db.Company = CompanyModel;
db.User = UserModel;
db.Merchant = MerchantModel;
db.Voucher = VoucherModel;
db.VoucherRedemption = VoucherRedemptionModel;

// =========================
// ASSOCIATIONS
// =========================

// Voucher relations
db.Voucher.belongsTo(db.Company, { foreignKey: 'company_id' });
db.Voucher.belongsTo(db.Merchant, { foreignKey: 'merchant_id' });
db.Voucher.belongsTo(db.User, {
  foreignKey: 'assigned_user_id',
  as: 'assigned_user'
});

// Redemption relations
db.VoucherRedemption.belongsTo(db.Voucher, {
  foreignKey: 'voucher_id'
});
db.VoucherRedemption.belongsTo(db.User, {
  foreignKey: 'user_id'
});
db.VoucherRedemption.belongsTo(db.Merchant, {
  foreignKey: 'merchant_id'
});

db.Voucher.hasMany(db.VoucherRedemption, {
  foreignKey: 'voucher_id',
  as: 'redemptions'
});

// Export
  db.Sequelize = Sequelize;

module.exports = db;
