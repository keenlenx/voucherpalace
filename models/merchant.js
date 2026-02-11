const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Merchant = sequelize.define('Merchant', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  contact_email: { type: DataTypes.STRING, unique: true },
  contact_phone: { type: DataTypes.STRING, unique: true },
  merchant_status: { type: DataTypes.ENUM('active','suspended','inactive'), defaultValue: 'active' }
}, {
  tableName: 'merchants',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Merchant;
