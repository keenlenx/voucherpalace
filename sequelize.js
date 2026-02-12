// sequelize.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Read DB credentials from .env
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME ;
const DB_USER = process.env.DB_USER ;
const DB_PASS = process.env.DB_PASS ;
const DB_PORT = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false, // Set to console.log for debug
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true,  // use table names as defined
    timestamps: true,       // default timestamps
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Test connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connection established'.DB_HOST))
  .catch(err => console.error('❌ Unable to connect to DB:', err));

module.exports = sequelize;
